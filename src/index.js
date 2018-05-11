import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from "./app/App.js";
import store from "./app/store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( 
    <Provider store={store}>
    <Router>
        <div>
            <App/>
        </div>
    </Router> 
</Provider>, window.document.getElementById('root'));

registerServiceWorker();
