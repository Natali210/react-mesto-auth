export const BASE_URL = "https://auth.nomoreparties.co";

const request = ({ 
  url, 
  method = "POST", 
  token, 
  data,
 }) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  return fetch(`${BASE_URL}${url}`, config)
    .then((res) => {
      return res.json();
    });
  }

// Регистрация
export const register = (email, password ) => {
  return request({
    url: "/signup",
    data: { email, password },
  });
};

// Авторизация
export const authorize = (email, password) => {
  return request({
    url: "/signin",
    data: { email, password },
  });
};

// Проверка токена и получение данных пользователя
export const getContent = (token) => {
  return request({
    url: "/users/me",
    method: "GET",
    token,
  });
};