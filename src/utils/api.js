import { baseUrl } from "../utils/constants";

class Api {
  constructor({ headers }) {
    // constructor body
    this.baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error ${res.status}`);
  }

  getItems() {
    return fetch(`${this.baseUrl}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  addItem({ name, imageUrl, weather }, token) {
    return fetch(`${this.baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        imageUrl,
        weather,
      }),
    }).then(this._checkResponse);
  }

  deleteItem(id, token) {
    return fetch(`${this.baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  addLike = (id, token) => {
    return fetch(`${this.baseUrl}/items/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  removeLike = (id, token) => {
    return fetch(`${this.baseUrl}/items/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };
}

export default Api;
