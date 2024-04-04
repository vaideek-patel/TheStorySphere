import {
  ADD_BOOK_TO_CART,
  CLEAR_CART,
  REMOVE_BOOK_FROM_CART,
  TOTAL_AMOUNT,
} from "../actions/actiontypes";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return {
        cart: [],
      };
    case TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: action.payload,
      };
    case ADD_BOOK_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_BOOK_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((book) => book.id !== action.payload.bookId),
      };
    default:
      return state;
  }
};

export default cartReducer;
