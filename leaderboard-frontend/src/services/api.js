import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
});


api.interceptors.response.use(
  response => response,
  error => {
      if (error.response?.status === 404) {
          console.error('Resource not found');
      }
      return Promise.reject(error);
  }
);

export default api;