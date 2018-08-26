import {DASHBOARD_PAGE_LOADED, DASHBOARD_PAGE_ERRORED, DASHBOARD_PAGE_LOADING} from './constants/ActionTypes';

function dashboardPageLoaded(message) {
    return {type: DASHBOARD_PAGE_LOADED, message};
}

function dashboardPageLoading(bool) {
    return {type: DASHBOARD_PAGE_LOADING, isLoading: bool};
}

function dashboardPageErrored(err) {
    return {type: DASHBOARD_PAGE_ERRORED, hasErrored: err};

}



export function loadDashboard() {
    return (dispatch) => {
        dispatch(dashboardPageLoading(true));

        fetch('http://localhost:8080/geoserver/cahibi1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:bandas&maxFeatures=50&outputFormat=application%2Fjson').then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(dashboardPageLoading(false));
            console.log('RESPONSE', response);

            return response;
        }).then((response) => response.json()).then((items) => dispatch(dashboardPageLoaded(items))).catch((err) => dispatch(dashboardPageErrored(err)));
    };
}


