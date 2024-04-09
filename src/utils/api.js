class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  getItems() {
    return fetch(`${this.baseUrl}/items`, {
      method: "GET",
    }).then(this._checkResponse);
  }
  addItem({ name, imageUrl, weather }) {
    return fetch(`${this.baseUrl}/items`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, imageUrl, weather }),
    }).then(this._checkResponse);
  }
  deleteClothingItem(id) {
    return fetch(`${this.baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }
}

export default Api;
