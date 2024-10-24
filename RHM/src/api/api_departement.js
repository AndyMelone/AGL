import api from "../libs/axios";


export const getDepartements = async () => {
    try {
        const response = await api.get("/departement");
        return response.data
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const createDepartement = async (name, managerId, location, budget, description ) => {
    try {
        const response = await api.post("/departement", {
            name : name,
            managerId: managerId,
            location: location,
            budget: budget,
            description: description
        });
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const updateDepartement = async (id, name, managerId, location, budget, description ) => {
    try {
        const response = await api.put(`/departement/${id}`, {
            name : name,
            managerId: managerId,
            location: location,
            budget: budget,
            description: description
        });
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const deleteDepartement = async (id) => {
    try {
        const response = await api.delete(`/departement/${id}`);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}