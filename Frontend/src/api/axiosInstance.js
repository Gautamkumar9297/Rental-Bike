import axios from "axios";

let baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
if (!baseURL.endsWith("/api")) baseURL += "/api";

const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
