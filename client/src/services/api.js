import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://rydenode-api.onrender.com/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ryde_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload)
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
