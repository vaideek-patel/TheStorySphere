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

export const createWishList = async (wishlistId, updatedData) => {
  try {
    const response = await API.post(`wishList/${wishlistId}`, updatedData);
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

export const registerNewSeller = async (sellerObj) => {
  try {
    const response = await API.post("sellers", sellerObj);
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

export const updateSellerData = async (sellerId, sellerData) => {
  try {
    const response = await API.put(`sellers/${sellerId}`, sellerData);
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

export const deleteSellerData = async (sellerId) => {
  try {
    const response = await API.delete(`sellers/${sellerId}`);
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

export const getSellerDataBySellerId = async (sellerId) => {
  try {
    const response = await API.get(`sellers/${sellerId}`);
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

export const registerNewSubCategory = async (subCategoryObj) => {
  try {
    const response = await API.post("sub-category", subCategoryObj);
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

export const deleteSubCategoryData = async (subCategoryId) => {
  try {
    const response = await API.delete(`sub-category/${subCategoryId}`);
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

export const updateSubCategoryData = async (subCategoryId, sellerData) => {
  try {
    const response = await API.put(`sub-category/${subCategoryId}`, sellerData);
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

export const getSubCategoryById = async (subCategoryId) => {
  try {
    const response = await API.get(`sub-category/${subCategoryId}`);
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

export const getReviewsById = async (reviewId) => {
  try {
    const response = await API.get(`reviews/${reviewId}`);
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

export const getAllReviews = async () => {
  try {
    const response = await API.get("/reviews");
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

export const listNewReview = async (reviewObj) => {
  try {
    const response = await API.post("reviews", reviewObj);
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

export const addReviewIdToBook = async (bookId, reviewId) => {
  try {
    const bookResponse = await API.get(`/books/${bookId}`);
    const book = bookResponse.data;

    book.reviews.push(reviewId);

    const patchResponse = await API.patch(`/books/${bookId}`, {
      reviews: book.reviews,
    });

    return {
      success: true,
      data: patchResponse.data,
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
