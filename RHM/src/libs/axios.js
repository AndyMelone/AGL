/* eslint-disable no-undef */
import axios from "axios";
import { E_RHM_API_URL } from "../config";

const api = axios.create({
  baseURL: E_RHM_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Erreur dans la requête :", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Erreur dans la réponse :", error);
    return Promise.reject(error);
  }
);

export default api;
