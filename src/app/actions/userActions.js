import {
    FETCH_USERS_REQUEST,
    FETCH_USER_DISPATCHEDS_REQUEST,
    DELETE_USER_REQUEST,
    CREATE_USER_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USER_DISPATCHEDS_SUCCESS,
    DELETE_USER_SUCCESS,
    CREATE_USER_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_USER_DISPATCHEDS_FAILURE,
    DELETE_USER_FAILURE,
    CREATE_USER_FAILURE,
} from './constants/ActionTypes';
import { Redirect } from 'react-router-dom';

import {
    alertError,
    alertSuccess,
    alertClear,
    clearAlerts
} from './alertActions';


function fetchUsersRequest(bool) {
    return { type: FETCH_USERS_REQUEST, bool };
}

function fetchUsersSuccess(users) {
    return { type: FETCH_USERS_SUCCESS, users };
}

function fetchUsersFailure(error) {
    return { type: FETCH_USER_DISPATCHEDS_FAILURE, error };

}

function fetchUserDispatchedsRequest(user) {
    return { type: FETCH_USER_DISPATCHEDS_REQUEST, user };
}

function fetchUserDispatchedsSuccess(dispatcheds) {
    return { type: FETCH_USER_DISPATCHEDS_SUCCESS, dispatcheds };
}

function fetchUserDispatchedsFailure(error) {
    return { type: FETCH_USER_DISPATCHEDS_FAILURE, error };

}


export function fetchUsers() {

    return dispatch => {
        dispatch(fetchUsersRequest(true));

        fetch('http://localhost:8080/geoserver/my_web_app/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=my_web_app:clientes&outputFormat=application%2Fjson').then(response => {
            if (!response.ok) {
                // dispatch(alertError(response));
                return Promise.reject(response.statusText);
            }
            console.log('USERS RESPONSE', response)
            return response.json();
        }).then((response) => {
            dispatch(fetchUsersRequest(false));
            dispatch(fetchUsersSuccess(response.features));
        }).catch((err) => {
            // dispatch(alertError(err));
            dispatch(fetchUsersFailure(err));
        });
    };
}


export function fetchUserDispatcheds(user) {

    return dispatch => {
        dispatch(fetchUserDispatchedsRequest(user));

        fetch('http://localhost:8080/geoserver/my_web_app/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=my_web_app:despachosCliente&viewparams=cliente:52&outputFormat=application%2Fjson').then(response => {
            if (!response.ok) {
                // dispatch(alertError(response));
                return Promise.reject(response.statusText);
            }
            console.log('USERS RESPONSE', response)
            return response.json();
        }).then((response) => {
            dispatch(fetchUserDispatchedsRequest(null));
            dispatch(fetchUserDispatchedsSuccess(response.features));
        }).catch((err) => {
            // dispatch(alertError(err));
            dispatch(fetchUserDispatchedsFailure(err));
        });
    };
}
