//export const BASE_URL = 'http://api.mesto.moulavy.nomoredomains.monster';
export const BASE_URL = 'http://localhost:3005';

function checkResponse(res) {
   if (res.ok) {
      return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
   })
      .then(checkResponse)
}

export const authorize = (email, password) => {
   return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
   })
      .then(checkResponse)
}


export const checkToken = (token) => {   
   return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials:'include',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         //Authorization: `Bearer ${token}`,
      }
   })
      .then(checkResponse)
}
