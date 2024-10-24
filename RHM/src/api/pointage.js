import api from "../libs/axios";

export const getListPresence = async (data) => {
  try {
    const response = await api.post("/mob/list", data);
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
}
}
