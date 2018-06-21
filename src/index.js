import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from "./app/App.js";
import store from "./app/store";
import {Provider} from "react-redux";
import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
export const history =  createHistory()
// import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render( 
    <Provider store={store}>
    <Router history={history} >
        <div>
            <App/>
        </div>
    </Router> 
</Provider>, window.document.getElementById('root'));

registerServiceWorker();
