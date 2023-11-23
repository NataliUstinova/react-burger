import { getCookie } from "./cookies";

const BASE_URL = "https://norma.nomoreparties.space/api";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._requestQueue = [];
    this._isRefreshing = false;
  }

  async _checkServerResponse(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(result.message);
  }

  async _request(endpoint, options) {
    try {
      const response = await fetch(`${this._baseUrl}${endpoint}`, options);
      return await this._checkServerResponse(response);
    } catch (error) {
      if (error === "jwt expired") {
        if (!this._isRefreshing) {
          this._isRefreshing = true;
          try {
            await this.refreshToken();
            options.headers.Authorization = getCookie("token");
            const retryResponse = await fetch(
              `${this._baseUrl}${endpoint}`,
              options
            );
            return await this._checkServerResponse(retryResponse);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            return Promise.reject("Token refresh failed");
          } finally {
            this._isRefreshing = false;
            this._requestQueue.forEach((queuedRequest) => queuedRequest());
            this._requestQueue = [];
          }
        } else {
          return new Promise((resolve) => {
            this._requestQueue.push(() => {
              resolve(this._request(endpoint, options));
            });
          });
        }
      }
      return Promise.reject(error);
    }
  }

  fetchIngredients() {
    return this._request("/ingredients", {
      method: "GET",
      headers: this._headers,
    });
  }

  postOrder(ingredientsIds) {
    return this._request("/orders", {
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
    return this._request("/auth/user", {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: getCookie("token"),
      },
    });
  }

  refreshToken() {
    return this._request("/auth/token", {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
  }

  logout() {
    return this._request("/auth/logout", {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
  }

  updateUser({ name, email, password }) {
    return this._request("/auth/user", {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: getCookie("token"),
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
  }

  resetPassword(email) {
    return this._request("/password-reset", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email: email }),
    });
  }

  confirmPasswordReset(password, token) {
    return this._request("/password-reset/reset", {
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
