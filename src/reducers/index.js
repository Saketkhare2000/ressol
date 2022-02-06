import { combineReducers } from "redux";

import userDataReducer from "./userDataReducer";
import authReducer from "./authReducer";
const rootReducer = combineReducers({
  userData: userDataReducer,
  auth: authReducer,
});
export default rootReducer;
