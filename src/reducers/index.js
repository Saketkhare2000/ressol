import { combineReducers } from "redux";

import userDataReducer from "./userDataReducer";
import authReducer from "./authReducer";
import propertyListReducer from "./propertyListReducer";
const rootReducer = combineReducers({
  userData: userDataReducer,
  auth: authReducer,
  propertyList: propertyListReducer,
});
export default rootReducer;
