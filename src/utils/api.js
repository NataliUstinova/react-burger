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

  fetchIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkServerResponse);
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
