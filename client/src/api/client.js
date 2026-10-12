import axios from 'axios';

// In dev, baseURL is '/api' (Vite proxies to the Express server).
// In prod, set VITE_API_URL to the deployed API origin, e.g. https://kashif-bakery-api.vercel.app/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Attach the admin JWT (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kb_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
