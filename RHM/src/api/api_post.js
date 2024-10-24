import api from "../libs/axios";

export const createPost = async (title, description, departmentId ) => {
    try {
        const response = await api.post("/post", {
            title : title,
            description: description,
            departmentId: departmentId,
            // responsibilities: responsibilities,
            // requirements: requirements,
        });
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const updatePost = async (id, title, description, responsibilities, requirements, departementId) => {
    try {
        const response = await api.put(`/post/${id}`, {
            title : title,
            description: description,
            responsibilities: responsibilities,
            requirements: requirements,
            departementId: departementId
        });
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/post/${id}`);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const getPosts = async () => {
    try {
        const response = await api.get("/post"); 
        return response.data
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const getPost = async (id) => {
    try {
        const response = await api.get(`/post/${id}`);
        return response.data
    } catch (error) {
        throw error.response?.data || error.message;
    }
}