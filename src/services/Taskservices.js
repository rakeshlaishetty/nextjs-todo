import apiClient from "@/helper/axios";

const AddTask = async (payload) => {
    try {
        const response = await apiClient.post("/api/tasks", payload)
        return response
    } catch (err) {
        return err
    }
}

const GetTaskOfUsers = async (userId) => {
    try {
        const response = await apiClient.get(`/api/users/${userId}/tasks/`)
        return response;
    } catch (err) {
        return err
    }
}
const DeleteTask = async (userId) => {
    try {
        const response = await apiClient.delete(`/api/users/${userId}/tasks/`)
        return response;
    } catch (err) {
        return err
    }
}


export { AddTask, GetTaskOfUsers,DeleteTask }