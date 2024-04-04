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

//BOOKS

export const getBooks = async (endpoint) => {
  try {
    const response = await API.get(endpoint);
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

export const getBookById = async (bookId) => {
  try {
    const response = await API.get(`books/${bookId}`);
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

//Wishlists

export const getUserWishlists = async (userId) => {
  try {
    const response = await API.get(`wishList?owner=${userId}`);
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

export const updateWishlist = async (userId, wishlistId, updatedData) => {
  try {
    const response = await API.put(`wishList/${wishlistId}?owner=${userId}`, updatedData);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

