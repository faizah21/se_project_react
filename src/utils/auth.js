import { baseUrl } from "../utils/constants";

class Auth {
  constructor({ headers }) {
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

  signUp({ name, email, password, avatar }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
        avatar,
      }),
    }).then(this._checkResponse);
  }

  signIn({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  updateUser({ name, avatar }, token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        avatar,
      }),
    }).then(this._checkResponse);
  }

  getUser(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

export default Auth;
