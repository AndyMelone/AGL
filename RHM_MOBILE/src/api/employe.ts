import api from "../lib/axios";

export const makePresence = async (employe: string, object:string  | null) => {
  try {
    const response = await api.post("/mob/makePresence", { 
        employe,
        object
     });
    return response.data;
  } catch (error) {
    console.error("Presence error:", error);
    throw error;
  }
}