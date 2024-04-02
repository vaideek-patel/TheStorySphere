import { LOGIN, LOGOUT } from "../actions/actiontypes";

const initalState = {
  isLoggedIn: false,
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
