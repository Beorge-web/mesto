export default class Api {
  constructor(config, method) {
    this.url = config.url;
    this.headers = config.headers;
    this.method = method;
  }

  getData() {
    return fetch(this.url, {
      method: this.method,
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  patchProfile(data) {
    return fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  addNewCard(data) {
    return fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).catch((err) => {
      console.error(`fail with error ${err.status}`);
    });
  }

  handleCard(id) { 
    console.log(this.headers)
    return fetch(this.url + id, {
      method: this.method,
      headers: this.headers,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  
}
