import axios from "axios";

const baseUrl = "http://localhost:8080/api/";

export const addTask = async (params) => {
  const response = await axios.post(`${baseUrl}add-task`, params);
  return response?.data;
};

export const updateTask = async (taskId, params) => {
  try {
    const response = await axios.put(`${baseUrl}tasks/${taskId}`, params);
    return response?.data;
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}tasks/${id}`);
    console.log(response)
    return response?.data;
  } catch (error) {
    return error?.data;
  }
};

export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${baseUrl}tasks`);
    return response?.data;
  } catch (error) {
    return error;
  }
};
