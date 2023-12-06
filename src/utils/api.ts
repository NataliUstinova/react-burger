import { getCookie, setCookie } from "./cookies";
import {
  TApiHeaders,
  TRefreshResponseWithToken,
  TServerSuccessfulResponse,
  TUserConfirmPasswordReset,
  TUserLoginInfo,
  TUserRegisterInfo,
  TUserResetPassword,
  TUserResponse,
  TUserResponseWithToken,
} from "./types";

const BASE_URL = "https://norma.nomoreparties.space/api";

class Api {
  private readonly _baseUrl: string;
  private readonly _headers: TApiHeaders;

  constructor({ baseUrl, headers }: { baseUrl: string; headers: TApiHeaders }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  private async _checkServerResponse<T>(res: Response): Promise<T> {
    const result: T = await res.json();
    return res.ok ? result : Promise.reject(result);
  }

  private _request<T>(endpoint: RequestInfo, options: RequestInit): Promise<T> {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this._checkServerResponse<T>
    );
  }

  public saveTokens = (refreshToken: string, accessToken: string): void => {
    setCookie("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  private _refreshTokenRequest = (): Promise<TRefreshResponseWithToken> => {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then((res) => this._checkServerResponse<TRefreshResponseWithToken>(res));
  };

  private _fetchWithRefresh = async <T>(
    url: RequestInfo,
    options: RequestInit
  ): Promise<T> => {
    try {
      const res = await fetch(`${this._baseUrl}${url}`, options);
      return await this._checkServerResponse<T>(res);
    } catch (err) {
      if (
        err === "jwt expired" ||
        (err === "You should be authorised" &&
          localStorage.getItem("refreshToken")) ||
        !getCookie("accessToken")
      ) {
        const { refreshToken, accessToken } = await this._refreshTokenRequest();
        this.saveTokens(refreshToken, accessToken);
        if (options.headers) {
          (options.headers as TApiHeaders).authorization = accessToken;
        }
        const res = await fetch(`${this._baseUrl}${url}`, options);

        return await this._checkServerResponse<T>(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  public fetchIngredients<T>(): Promise<TServerSuccessfulResponse<T>> {
    return this._request("/ingredients", {
      method: "GET",
      headers: this._headers,
    });
  }

  public postOrder(ingredientsIds: string[]): Promise<TUserResponseWithToken> {
    return this._fetchWithRefresh<TUserResponseWithToken>("/orders", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ ingredients: ingredientsIds }),
    });
  }

  public register({
    email,
    password,
    name,
  }: TUserRegisterInfo): Promise<TUserResponseWithToken> {
    return this._request("/auth/register", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password, name }),
    });
  }

  public login({
    email,
    password,
  }: TUserLoginInfo): Promise<TUserResponseWithToken> {
    return this._request("/auth/login", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    });
  }

  public getUser(): Promise<TUserResponse> {
    return this._fetchWithRefresh<TUserResponse>("/auth/user", {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: getCookie("accessToken"),
      } as HeadersInit,
    });
  }

  public logout(): Promise<TUserResponseWithToken> {
    return this._fetchWithRefresh<TUserResponseWithToken>("/auth/logout", {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
  }

  public updateUser({
    name,
    email,
    password,
  }: TUserRegisterInfo): Promise<TUserResponseWithToken> {
    return this._fetchWithRefresh<TUserResponseWithToken>("/auth/user", {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: getCookie("accessToken"),
      } as HeadersInit,
      body: JSON.stringify({ name, email, password }),
    });
  }

  public resetPassword({
    email,
  }: TUserResetPassword): Promise<TUserResponseWithToken> {
    return this._fetchWithRefresh<TUserResponseWithToken>("/password-reset", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email }),
    });
  }

  public confirmPasswordReset({
    password,
    token,
  }: TUserConfirmPasswordReset): Promise<TUserResponseWithToken> {
    return this._fetchWithRefresh<TUserResponseWithToken>(
      "/password-reset/reset",
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ password, token }),
      }
    );
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
