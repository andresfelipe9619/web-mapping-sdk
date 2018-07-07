import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    LOGOUT_REQUEST
} from './constants/ActionTypes';
import { Redirect } from 'react-router-dom';

import { alertError, alertSuccess, alertClear, clearAlerts } from './alertActions';

function logoutRequest(user) {
    return { type: LOGOUT_REQUEST, user };
}

function loginRequest(user) {
    return { type: LOGIN_REQUEST, user };
}

function loginSuccess(user) {
    return { type: LOGIN_SUCCESS, user };
}

function loginFailure(error) {
    return { type: LOGIN_FAILURE, error };

}

export function logout() {
    return dispatch => {
        dispatch(loginSuccess(false));
    }
}

export function login(user) {

    return dispatch => {
        dispatch(loginRequest(user));

        
        let url = `http://localhost:8080/geoserver/cahibi1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:auth&viewparams=usn:${user.username};psw:${user.password}&maxFeatures=50&outputFormat=application%2Fjson`

        fetch(url).then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json()

        }).then(user => {
            if(user.features.length>0){
                return user.features 
            }
            else return {err: "Wrong"}

        }).then((user) => {
            console.log('user', user)
            if (user.err) {
                dispatch(alertError(user.err));
            } else {
                dispatch(loginSuccess(user[0].properties));
            }
        }).catch((err) => {
            dispatch(alertError(err));
            dispatch(loginFailure(err));
        });
    };
}

function authenticateUser(user) {

}