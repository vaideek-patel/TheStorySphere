import { ADD_TO_WISHLIST, REMOVE_DATA, SET_DATA } from "./actiontypes";

export const setData = (data) => {
  return {
    type: SET_DATA,
    payload: data,
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
