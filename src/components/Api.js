export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getData(path) {
    return fetch(this._url + path, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })

  }
  patchProfile(data, button) {
    this._rendering(button, true);
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        this._rendering(button, false);
      });
  }

  addNewCard(data, button) {
    this._rendering(button, true);
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        this._rendering(button, false);
      });
  }
  deleteCard(id) {
    return fetch(this._url + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  handleCard(id, action) {
    if (action == true) {
      this._method = "PUT";
    } else {
      this._method = "DELETE";
    }
    return fetch(this._url + "/cards/likes/" + id, {
      method: this._method,
      headers: this._headers,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  updateAvatar(data, button) {
    this._rendering(button, true);
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        this._rendering(button, false);
      });
  }
  _rendering(button, isLoading) {
    if (isLoading == true) {
      button.textContent = "Сохранение...";
    } else {
      button.textContent = "Сохранить";
    }
  }
}
