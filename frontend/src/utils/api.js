import {BASE_URL} from './auth.js'

class Api {
   constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
   }

   _checkResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }

   getUserInfo() {     
      return fetch(`${this._baseUrl}/users/me`, { 
         headers: this._headers,
         credentials: 'include'
      })
      .then(this._checkResponse)
   }

   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         headers: this._headers,
         credentials: 'include',
      })
         .then(this._checkResponse);
   }

   updateUserInfo(data) {      
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         credentials: 'include',
         body: JSON.stringify({
            name: data.name,
            about: data.about,            
         })
      })
         .then(this._checkResponse);
   }

   updateAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         credentials: 'include',
         body: JSON.stringify({
            avatar: data.avatar,            
         })
      })
         .then(this._checkResponse);
   }

   addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         credentials: 'include',
         body: JSON.stringify({
            name: data.name,
            link: data.link
         })
      })
         .then(this._checkResponse);
   }

   deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
         method: 'DELETE',
         credentials: 'include',
         headers: this._headers         
      })
         .then(this._checkResponse);
   }

   addLike(idCard) {
      return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
         method: 'PUT',
         credentials: 'include',
         headers: this._headers
      })
         .then(this._checkResponse)
   }

   deleteLike(idCard) {
      return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
         method: 'DELETE',
         credentials: 'include',
         headers: this._headers
      })
         .then(this._checkResponse)
   }
  
}

const api = new Api({
   baseUrl: BASE_URL,
   credentials: 'include',
   headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      
   }
}); 

export default api;