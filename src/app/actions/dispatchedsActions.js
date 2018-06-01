import {
    FETCH_USER_DISPATCHEDS_REQUEST,
    FETCH_USER_DISPATCHEDS_SUCCESS,
    FETCH_USER_DISPATCHEDS_FAILURE,
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


export function fetchUserDispatcheds(user) {
    
    return dispatch => {
        dispatch(fetchUserDispatchedsRequest(user));

        fetch(`http://localhost:8080/geoserver/my_web_app/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=my_web_app:despachosCliente&viewparams=cliente:${user.clientid}&outputFormat=application%2Fjson`).then(response => {
            if (!response.ok) {
                // dispatch(alertError(response));
                return Promise.reject(response.statusText);
            }
            console.log('DDDDDDDDDDDDDD RESPONSE', response)
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