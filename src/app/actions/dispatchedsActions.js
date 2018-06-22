import {
    FETCH_USER_DISPATCHEDS_REQUEST,
    FETCH_USER_DISPATCHEDS_SUCCESS,
    FETCH_USER_DISPATCHEDS_FAILURE,
    FETCH_DISPATCHEDS_REQUEST,
    FETCH_DISPATCHEDS_SUCCESS,
    FETCH_DISPATCHEDS_FAILURE,
} from './constants/ActionTypes';



function fetchUserDispatchedsRequest(bool) {
    return { type: FETCH_USER_DISPATCHEDS_REQUEST, bool };
}

function fetchUserDispatchedsSuccess(dispatcheds) {
    return { type: FETCH_USER_DISPATCHEDS_SUCCESS, dispatcheds };
}

function fetchUserDispatchedsFailure(error) {
    return { type: FETCH_USER_DISPATCHEDS_FAILURE, error };

}

function fetchDispatchedsRequest(bool) {
    return { type: FETCH_DISPATCHEDS_REQUEST, bool };
}

function fetchDispatchedsSuccess(dispatcheds) {
    return { type: FETCH_DISPATCHEDS_SUCCESS, dispatcheds };
}

function fetchDispatchedsFailure(error) {
    return { type: FETCH_DISPATCHEDS_FAILURE, error };

}


export function fetchUserDispatcheds(user, product) {
    var userDispatcheds = '';
    // if (product) {
    //     userDispatcheds = `http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:despachosClienteConProducto&viewparams=cliente:${user};producto:${product}&outputFormat=application%2Fjson`
    // } else {
        userDispatcheds = `http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:despachosCliente&viewparams=cliente:${user}&outputFormat=application%2Fjson`

    // }
    return dispatch => {

        dispatch(fetchUserDispatchedsRequest(user));

        fetch(userDispatcheds).then(response => {
            // fetch(``).then(response => {
            // fetch(`http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:mallasOrigenProductoCliente&viewparams=cliente:52;producto:g38&outputFormat=application%2Fjson`).then(response => {
            if (!response.ok) {
                // dispatch(alertError(response));
                return Promise.reject(response.statusText);
            }
            return response.json();
        }).then((response) => {
            dispatch(fetchUserDispatchedsRequest(false));
            dispatch(fetchUserDispatchedsSuccess(response.features));
        }).catch((err) => {
            // dispatch(alertError(err));
            dispatch(fetchUserDispatchedsFailure(err));
        });
    };

}

export function fetchDispatcheds() {

    return dispatch => {
        dispatch(fetchDispatchedsRequest(true));

        fetch(`http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:despachos&outputFormat=application%2Fjson`).then(response => {
            if (!response.ok) {
                // dispatch(alertError(response));
                return Promise.reject(response.statusText);
            }
            return response.json();
        }).then((response) => {
            dispatch(fetchDispatchedsRequest(false));
            dispatch(fetchDispatchedsSuccess(response.features));
        }).catch((err) => {
            // dispatch(alertError(err));
            dispatch(fetchDispatchedsFailure(err));
        });
    };

}