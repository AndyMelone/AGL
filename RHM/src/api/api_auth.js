import api from "../libs/axios";

export const loginUser = async (pseudo, password) => {
  try {
    const response = await api.post("/auth/login", {
      pseudo: pseudo,
      password: password,
    });
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
