import { LOGIN, LOGOUT } from "./actiontypes";

export const login = () => {
  return {
    type: LOGIN,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
