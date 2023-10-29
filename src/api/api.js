import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_AUTH_URL,
  withCredentials: true
});

// Adding an interceptor to transform the structure of the response from the server
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export const sendLoginDataToServer = async (data) => {
  console.log(data)
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