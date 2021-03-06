import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_USER_DISPATCHEDS_REQUEST,
    FETCH_USER_DISPATCHEDS_SUCCESS,
    FETCH_USER_DISPATCHEDS_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_FAILURE,
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


export function fetchClients() {

    return dispatch => {
        dispatch(fetchUsersRequest(true));

        fetch('http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:clientes&outputFormat=application%2Fjson').then(response => {
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
export function fetchOperarios() {

    return dispatch => {
        dispatch(fetchUsersRequest(true));

        fetch('http://localhost:8080/geoserver/cahibi1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:operarios&maxFeatures=50&outputFormat=application%2Fjson').then(response => {
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
export function fetchJefes() {

    return dispatch => {
        dispatch(fetchUsersRequest(true));

        fetch('http://localhost:8080/geoserver/cahibi1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:jefes&maxFeatures=50&outputFormat=application%2Fjson').then(response => {
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


