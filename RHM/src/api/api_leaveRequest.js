import api from "../libs/axios";

export const getLeaveRequests = async () => {
  try {
    const response = await api.get("/leave/pending");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const approveLeaveRequest = async (id) => {
  try {
    const response = await api.post(`leave/approve/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
