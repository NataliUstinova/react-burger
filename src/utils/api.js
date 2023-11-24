import { getCookie, setCookie } from "./cookies";

const BASE_URL = "https://norma.nomoreparties.space/api";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async _checkServerResponse(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(result.message);
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this._checkServerResponse
    );
  }

  saveTokens = (refreshToken, accessToken) => {
    setCookie("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  refreshTokenRequest = () => {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(this._checkServerResponse);
  };

  fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(`${this._baseUrl}${url}`, options);
      return await this._checkServerResponse(res);
    } catch (err) {
      if (
        err.message === "jwt expired" ||
        (err.message === "You should be authorised" &&
          localStorage.getItem("refreshToken")) ||
        !getCookie("accessToken")
      ) {
        const { refreshToken, accessToken } = await this.refreshTokenRequest();
        this.saveTokens(refreshToken, accessToken);

        options.headers.authorization = accessToken;

        const res = await fetch(`${this._baseUrl}${url}`, options);

        return await this._checkServerResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  fetchIngredients() {
    return this._request("/ingredients", {
      method: "GET",
      headers: this._headers,
    });
  }

  postOrder(ingredientsIds) {
    return this.fetchWithRefresh("/orders", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ ingredients: ingredientsIds }),
    });
  }

  register({ email, password, name }) {
    return this._request("/auth/register", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email: email, password: password, name: name }),
    });
  }

  login(email, password) {
    return this._request("/auth/login", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email: email, password: password }),
    });
  }

  getUser() {
    return this.fetchWithRefresh("/auth/user", {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: getCookie("accessToken"),
      },
    });
  }

  logout() {
    return this.fetchWithRefresh("/auth/logout", {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
  }

  updateUser({ name, email, password }) {
    return this.fetchWithRefresh("/auth/user", {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: getCookie("accessToken"),
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
  }

  resetPassword(email) {
    return this.fetchWithRefresh("/password-reset", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email: email }),
    });
  }

  confirmPasswordReset(password, token) {
    return this.fetchWithRefresh("/password-reset/reset", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password: password, token: token }),
    });
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
