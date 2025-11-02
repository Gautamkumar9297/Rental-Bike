import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if your backend URL differs
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
