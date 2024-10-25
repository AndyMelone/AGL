import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const E_RHM_API_URL = "http://192.168.1.66:5000/api";

const api = axios.create({
  baseURL: E_RHM_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("access");
    config.data = {
      ...config.data,
      access: accessToken,
    };
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
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
