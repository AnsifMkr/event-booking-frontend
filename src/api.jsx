import axios from 'axios';

const API = axios.create({
  baseURL: 'https://event-booking-backend-rsnj.onrender.com', // Django backend hosted on Render
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
