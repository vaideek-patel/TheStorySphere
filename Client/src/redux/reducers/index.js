import { combineReducers } from "redux";
import { roleReducer } from "./isAuthReducer";
import { dataReducer } from "./dataReducer";
import cartReducer from "./cartReducer";
import { appReducer } from "./appReduce";

const rootReducer = combineReducers({
  app: appReducer,
  role: roleReducer,
  data: dataReducer,
  cart: cartReducer,
});

export default rootReducer;
