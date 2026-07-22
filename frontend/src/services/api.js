import axios from 'axios';
import { auth } from '../firebase';
const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  
  if (user && !user.isGuest) {
    try {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      console.warn("Failed to get Firebase token:", e);
    }
  }
  
  return config;
});

export default api;
