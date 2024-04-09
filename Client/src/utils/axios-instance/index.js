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

export const getAllBooks = async () => {
  try {
    const response = await API.get("books");
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
    const response = await API.put(
      `wishList/${wishlistId}?owner=${userId}`,
      updatedData
    );
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

export const placeOrder = async (orderObj) => {
  try {
    const response = await API.post("orders", orderObj);
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

export const getOrderById = async (id) => {
  try {
    const response = await API.get(`orders/${id}`);
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

export const getOrders = async () => {
  try {
    const response = await API.get("orders");
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

export const deleteOrderById = async (orderId) => {
  try {
    const response = await API.delete(`/orders/${orderId}`);
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

export const getCategory = async () => {
  try {
    const response = await API.get("category");
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

export const getCategorydataFromId = async (id) => {
  try {
    const response = await API.get(`category?id=${id}`);
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
export const getSubCategory = async () => {
  try {
    const response = await API.get("sub-category");
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

export const getSubcategoriesByCategoryId = async (categoryId) => {
  try {
    const response = await API.get(`sub-category?categoryId=${categoryId}`);
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

export const getBooksBySubcategoryId = async (subcategoryId) => {
  try {
    const response = await API.get(`books?subCategoryId=${subcategoryId}`);
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

// export const getCarolShieldsPrizeForFiction = async (subcategoryId) => {
//   try {
//     const response = await API.get(`books?subCategoryId=${subcategoryId}`);
//     return {
//       success: true,
//       data: response.data,
//       error: null,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       data: [],
//       error: error.message,
//     };
//   }
// };
//Sellers

export const getSellers = async () => {
  try {
    const response = await API.get("sellers");
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

export const getSellersBooksBySellerId = async (sellerId) => {
  try {
    const response = await API.get(`books?soldBy=${sellerId}`);
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

export const getAccountDetailByUsertId = async (userId) => {
  try {
    const response = await API.get(`users?id=${userId}`);
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
export const updateUserData = async (userId, newData) => {
  try {
    const response = await API.put(`users/${userId}`, newData);
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

export const deleteUserData = async (userId) => {
  try {
    const response = await API.delete(`users/${userId}`);
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

//ADMIN

export const registerNewCategory = async (categoryObj) => {
  try {
    const response = await API.post("category", categoryObj);
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
export const updateCateoryData = async (categoryId, newData) => {
  try {
    const response = await API.put(`category/${categoryId}`, newData);
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

export const deleteCategoryData = async (categoryId) => {
  try {
    const response = await API.delete(`category/${categoryId}`);
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

export const registerNewBook = async (bookObj) => {
  try {
    const response = await API.post("books", bookObj);
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

export const updateBookData = async (bookId, bookData) => {
  try {
    const response = await API.put(`books/${bookId}`, bookData);
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

export const deleteBookData = async (bookId) => {
  try {
    const response = await API.delete(`books/${bookId}`);
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
