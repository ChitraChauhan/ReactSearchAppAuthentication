import { combineReducers } from "redux";
import errorReducer from "./Users/errorReducer";
import authReducer from "./Users/authReducer";
import errorProfileReducer from "./Profiles/errorProfileReducer";
import authProfileReducer from "./Profiles/authProfileReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  profileErrors: errorProfileReducer,
  authProfile: authProfileReducer
});
