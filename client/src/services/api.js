import axios from "axios";

const API = axios.create({
  baseURL: "https://rydenode-api.onrender.com/api"
});

export default API;