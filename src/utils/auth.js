const baseUrl = "http://localhost:3001/";
import { processServerResponse } from "../utils/weatherApi";

export function register(email, password, name, avatar) {
  return fetch(baseUrl + "signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  })
    .then(processServerResponse)
    .then(() => {
      // immediately sign the user in
      signin(email, password);
    });
}

export function signin(email, password) {
  return fetch(baseUrl + "signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(processServerResponse)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}

export function getUser(token) {
  return fetch(baseUrl + "users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(processServerResponse)
    .then((user) => {
      return user;
    });
}
