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

  register(email, password, name) {
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
