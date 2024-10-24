import api from "../libs/axios";


export const getTeam = async () => {
    try {
        const response = await api.get("/team");
        return response.data
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const createDepartement = async (name, manager, members,  description ) => {
    try {
        const response = await api.post("/team", {
            name : name,
            manager: manager,
            members: members,
            description: description
        });
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const updateTeam = async (id, name, manager, members, description ) => {
    try {
        const response = await api.put(`/team/${id}`, {
            name : name,
            manager: manager,
            members: members,
            description: description
        });
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const deleteTeam = async (id) => {
    try {
        const response = await api.delete(`/team/${id}`);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}