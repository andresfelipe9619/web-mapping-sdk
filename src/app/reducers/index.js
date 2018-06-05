import { combineReducers } from "redux";

import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import SdkMapInfoReducer from '@boundlessgeo/sdk/reducers/mapinfo';
import SdkWfsReducer from '@boundlessgeo/sdk/reducers/wfs';
import homeReducer from "./home";
import dashboardReducer from "./dashboard";
import authReducer from "./auth";
import SdkDrawingReducer from '@boundlessgeo/sdk/reducers/drawing';
import loginReducer from "./login"
// import alertReducer from "./alert"
import userReducer from './user';
import dispatchedReducer from './dispatcheds'
import productReducer from './product'


export default combineReducers({
  map: SdkMapReducer,
  mapinfo: SdkMapInfoReducer,
  drawing: SdkDrawingReducer, 
  wfs: SdkWfsReducer,
  homeReducer,
  dashboardReducer,
  authReducer,
  loginReducer,
  userReducer,
  dispatchedReducer,
  productReducer
  // alertReducer
});
