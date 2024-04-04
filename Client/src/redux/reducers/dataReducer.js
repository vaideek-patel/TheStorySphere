import { SET_DATA, ADD_TO_WISHLIST, REMOVE_DATA } from "../actions/actiontypes";

const initialState = {
  wishList: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST: {
      const { wishlistId, bookData } = action.payload;
      const wishlistToUpdate = state.wishList.find(
        (wishlist) => wishlist.id === wishlistId
      );
      const updatedBooks = [...wishlistToUpdate.books, bookData];
      const updatedWishlist = { ...wishlistToUpdate, books: updatedBooks };
      return {
        ...state,
        wishList: state.wishList.map((wishlist) =>
          wishlist.id === wishlistId ? updatedWishlist : wishlist
        ),
      };
    }
    case SET_DATA: {
      return {
        ...state,
        wishList: action.payload,
      };
    }
    case REMOVE_DATA: {
      return {
        wishList: [], // Reset wishList to an empty array
      };
    }
    default: {
      return state;
    }
  }
};

export { dataReducer };
