import { combineReducers } from "redux";
import { roleReducer } from "./isAuthReducer";
import { dataReducer } from "./dataReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  role: roleReducer,
  data: dataReducer,
  cart: cartReducer,
});

export default rootReducer;
