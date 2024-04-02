import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

export const getUsers = async () => {
  try {
    const response = await API.get("users");
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

export const registerUser = async (userObj) => {
  try {
    const response = await API.post("users", userObj);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
};
