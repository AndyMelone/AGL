import api from "../lib/axios";

export const makePresence = async (employe: string, object: string | null) => {
  try {
    const response = await api.post("/mob/makePresence", {
      employe,
      object,
    });
    return response.data;
  } catch (error) {
    console.error("Presence error:", error);
    throw error;
  }
};

export const getTaskList = async (employe: string) => {
  try {
    const response = await api.get(`/mob/getTaskList/${employe}`);
    return response.data;
  } catch (error) {
    console.error("TaskList error:", error);
    throw error;
  }
};
