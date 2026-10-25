import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});

export const UNAUTHORIZED_EVENT = "ryde:unauthorized";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ryde_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCall = error.config?.url?.startsWith("/auth/login") || error.config?.url?.startsWith("/auth/register");
    if (error.response?.status === 401 && !isAuthCall) {
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }
    return Promise.reject(error);
  }
);

export const getErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  if (error.response?.data?.error) return error.response.data.error;
  if (error.request) return "Cannot reach the server. It may be waking up, try again in a few seconds.";
  return fallback;
};

export const authApi = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload),
  me: () => api.get("/auth/me")
};

export const rideApi = {
  requestRide: (payload) => api.post("/rides/request", payload),
  myRides: () => api.get("/rides/my"),
  availableRides: () => api.get("/rides/available")
};

export const vehicleApi = {
  create: (payload) => api.post("/vehicles", payload)
};

export default api;
