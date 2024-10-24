import api from "../libs/axios";


export const getEmployes = async () => {
  try {
    const response = await api.get("/employe");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const createEmploye = async ({
  flag,
  comments, 
  firstName,
  lastName,
  dateOfBirth,
  placeOfBirth,
  address,
  gender,
  phoneNumber,
  email,
  departmentId,
  positionId,
  contractType,
  salary,
  socialSecurityNumber,
  emergencyContactName,
  emergencyContactPhone,
  emergencyContactlastName,
  emergencyContactEmail,
  emergencyContactAdress,
  matricule
}) => {
  try {
    const response = await api.post("/employe", {
      flag,
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      phoneNumber: phoneNumber || null, 
      email,
      address,
      gender,
      departmentId,
      positionId,
      contractType,
      salary: salary, 
      socialSecurityNumber,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactlastName,
      emergencyContactEmail,
      emergencyContactAdress,
      comments: comments, 
      matricule
    });
    return response.data;
  } catch (error) {
      return error.response?.data || error.message;
  }
};

export const getEmploye = async (id) => {
  try {
    const response = await api.get(`/employe/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export const deleteEmploye = async (id) => {
  try {
    const response = await api.delete(`/employe/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}