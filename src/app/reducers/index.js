import { combineReducers } from "redux";

import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import homeReducer from "./home";
import dashboardReducer from "./dashboard";
import authReducer from "./auth";
// import contactReducer from "./contact"
import loginReducer from "./login"
// import alertReducer from "./alert"


export default combineReducers({
  map : SdkMapReducer,
  homeReducer,
  dashboardReducer,
  authReducer,
  // contactReducer,
  loginReducer,
  // alertReducer
});
