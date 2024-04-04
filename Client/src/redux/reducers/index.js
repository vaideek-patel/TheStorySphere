import { combineReducers } from "redux";
import { roleReducer } from "./isAuthReducer";
import { dataReducer } from "./dataReducer";

const rootReducer = combineReducers({
  role: roleReducer,
  data: dataReducer,
});

export default rootReducer;
