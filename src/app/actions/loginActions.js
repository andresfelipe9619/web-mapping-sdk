import {LOGIN_PAGE_LOADED, LOGIN_PAGE_ERRORED, LOGIN_PAGE_LOADING} from './constants/ActionTypes';

function loginPageLoaded(message) {
    return {type: LOGIN_PAGE_LOADED, message};
}

function loginPageLoading(bool) {
    return {type: LOGIN_PAGE_LOADING, isLoading: bool};
}

function loginPageErrored(bool) {
    return {type: LOGIN_PAGE_ERRORED, hasErrored: bool};

}

export function loadLogin() {
    return (dispatch) => {
        dispatch(loginPageLoading(true));

        fetch('http://localhost:8080/geoserver/cahibi1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:bandas&maxFeatures=50&outputFormat=application%2Fjson').then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(loginPageLoading(false));

            return response;
        }).then((response) => response.json()).then((items) => dispatch(loginPageLoaded(items))).catch((err) => dispatch(loginPageErrored(err)));
    };
}

