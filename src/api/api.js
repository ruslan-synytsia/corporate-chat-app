import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_AUTH_URL,
  withCredentials: true
});

// Добавляем interceptor для преобразования структуры ответа от сервера
instance.interceptors.response.use(
  (response) => {
    // Если успешный ответ от сервера, возвращаем только данные из ответа
    return response.data;
  },
  (error) => {
    // Если произошла ошибка, обрабатываем ее здесь
    return Promise.reject(error.response.data);
  }
);

export const sendLoginDataToServer = async (data) => {
  try {
    const response = await instance.post('/login', data);
    return response;
  } catch (err) {
    return err;
  }
};

export const sendRegistrDataToServer = async (data) => {
  try {
    const response = await instance.post('/registration', data);
    return response;
  } catch (err) {
    return err;
  }
};

export const getChatData = async () => {
  try {
    const response = await instance.get('/chat', {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response;
  } catch (err) {
    return err;
  }
}

export const getListUsers = async () => {
  try {
    const response = await instance.get('/users-list', {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response;
  } catch (err) {
    return err;
  }
}