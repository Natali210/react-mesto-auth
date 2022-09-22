class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Ответ в промисах различных методов в зависимости от наличия ошибки
  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }

    throw Promise.reject(`Ошибка: ${res.status}`);
  }

  //Метод, который вернет информацию о пользователе
  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(this._getJsonOrError)
  }

  //Метод, который сохранит измененные данные о пользователе
  setProfileInfo(data){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then(this._getJsonOrError)
  }

  //Метод, который сохранит измененные данные о пользователе
  addNewAvatar(data){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    .then(this._getJsonOrError)
  }

  //Метод, который вернет карточки
  getCards(){
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(this._getJsonOrError)
  }

  //Метод, добавляющий карточки
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
    .then(this._getJsonOrError)
  }

  //Метод, удаляющий карточки
  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getJsonOrError)
  }

    //Метод, собирающий лайки
  putLike(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getJsonOrError);
  }

  //Метод, удаляющий лайк
  removeLike(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getJsonOrError);
  }

  changeLikeCardStatus(card, isLiked) {
    return isLiked ? this.putLike(card) : this.removeLike(card);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: 'f085916c-6915-4c31-bcde-3cb49b2623b6',
    'Content-Type': 'application/json',
  },
});