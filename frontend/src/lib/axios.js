import axios from "axios";

const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;

// In development: use localhost:3000
// In production on Render: use same origin (e.g., imessage-o9d2.onrender.com)
// In production locally: use /api (for same-origin requests)
let baseURL = "/api";
if (isDevelopment) {
  baseURL = "http://localhost:3000/api";
}

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});