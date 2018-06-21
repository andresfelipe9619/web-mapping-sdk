import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers"
import promise from "redux-promise-middleware";
import thunk from 'redux-thunk';


const enhancers = [window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()];

const middleware = [thunk, promise()];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);


const store = createStore(rootReducer, {}, composedEnhancers);

export default store;