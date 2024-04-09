import {
  ADD_BOOK_TO_CART,
  ADD_TO_FAVORITES,
  ADD_TO_WISHLIST,
  CLEAR_CART,
  ORDER_DETAILS,
  REMOVE_BOOK_FROM_CART,
  REMOVE_DATA,
  REMOVE_FROM_FAVORITES,
  SET_DATA,
  TOTAL_AMOUNT,
} from "./actiontypes";

export const setData = (data) => {
  return {
    type: SET_DATA,
    payload: data,
  };
};

export const addToFavorites = (book) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: book,
  };
};

export const removeFromFavorites = (bookId) => {
  return {
    type: REMOVE_FROM_FAVORITES,
    payload: {
      bookId: bookId,
    },
  };
};

export const removeData = () => {
  return {
    type: REMOVE_DATA,
  };
};
export const addToWishlist = (wishlistId, bookData) => {
  return {
    type: ADD_TO_WISHLIST,
    payload: { wishlistId, bookData },
  };
};

export const bookToCart = (book) => {
  return {
    type: ADD_BOOK_TO_CART,
    payload: book,
  };
};

export const removeBookFromCart = (bookId) => {
  return {
    type: REMOVE_BOOK_FROM_CART,
    payload: {
      bookId: bookId,
    },
  };
};

export const finalOrderDetails = (finalOrderData) => {
  return {
    type: ORDER_DETAILS,
    payload: finalOrderData,
  };
};

export const removeFinalOrderDetails = () => {
  return {
    type: CLEAR_CART,
  };
};
export const totalAmount = (amount) => {
  return {
    type: TOTAL_AMOUNT,
    payload: amount,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
