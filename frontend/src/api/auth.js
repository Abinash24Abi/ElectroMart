import axios from "axios";

// ✅ Base URL configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://electromart-l51h.onrender.com";

// Create an Axios instance
const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // for sending cookies
});

// Auth API functions
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const logout = () => API.post("/auth/logout");
export const getMe = () => API.get("/auth/me");

export default API;
