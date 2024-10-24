import api from "../lib/axios";
import { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useAuthStore from "../store/store_auth";


interface Tokens {
  token: { accessToken: any; refreshToken: any; };
  message: string;
  data: any;
}

export const loginApi = async (
  matricule: string,
  password: string
): Promise<AxiosResponse<Tokens>> => {
  try {
    const response: AxiosResponse<Tokens> = await api.post("/auth/login", {
      matricule,
      password,
    });

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data.token;

      const { login } = useAuthStore.getState(); 
      await login(response.data.data , accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
    }


    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
