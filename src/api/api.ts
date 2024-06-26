import axios from 'axios';

export const api = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
  baseURL: '/api/v1',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});
