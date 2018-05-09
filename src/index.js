import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';


const store = createStore(combineReducers({'map': SdkMapReducer}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render( 
    <Provider store={store}>
            <App/>
</Provider>, window.document.getElementById('root'));

registerServiceWorker();
