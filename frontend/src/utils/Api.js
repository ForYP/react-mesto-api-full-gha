import { BASE_URL, jwt } from './utils';

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers; 
    this._authorization = config.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  getInitialCards () {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    })
  }

  getUserInfo () {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    })
  }

  updateUserInfo(item) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    })
  }

  updateAvatar(newUrl) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newUrl
      })
    })
  }

  updateCards(item) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      })
    })
  }

  deleteCard(card) {
    return this._request(`${this._url}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return this._request(`${this._url}/cards/${card._id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
    } else {
      return this._request(`${this._url}/cards/${card._id}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
    }
  }
}
const api = new Api({
  url: BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  }
})

export default api;