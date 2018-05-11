import {DASHBOARD_PAGE_LOADED, DASHBOARD_PAGE_ERRORED, DASHBOARD_PAGE_LOADING,
    ACTIONS_PAGE_LOADED, ACTIONS_PAGE_ERRORED, ACTIONS_PAGE_LOADING} from './constants/ActionTypes';

function dashboardPageLoaded(message) {
    return {type: DASHBOARD_PAGE_LOADED, message};
}

function dashboardPageLoading(bool) {
    return {type: DASHBOARD_PAGE_LOADING, isLoading: bool};
}

function dashboardPageErrored(err) {
    return {type: DASHBOARD_PAGE_ERRORED, hasErrored: err};

}

function actionsPageLoaded(message) {
    return {type: DASHBOARD_PAGE_LOADED, message};
}

function actionsPageLoading(bool) {
    return {type: DASHBOARD_PAGE_LOADING, isLoading: bool};
}

function actionsPageErrored(err) {
    return {type: DASHBOARD_PAGE_ERRORED, hasErrored: err};

}

export function loadDashboard() {
    return (dispatch) => {
        dispatch(dashboardPageLoading(true));

        fetch('https://jsonplaceholder.typicode.com/posts/1').then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(dashboardPageLoading(false));
            console.log('RESPONSE', response);

            return response;
        }).then((response) => response.json()).then((items) => dispatch(dashboardPageLoaded(items))).catch((err) => dispatch(dashboardPageErrored(err)));
    };
}

export function loadUserActions() {
    return (dispatch) => {
        dispatch(actionsPageLoading(true));

        fetch('https://jsonplaceholder.typicode.com/posts/1').then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(actionsPageLoading(false));
            console.log('RESPONSE', response);

            return response;
        }).then((response) => response.json()).then((items) => dispatch(actionsPageLoaded(items))).catch((err) => dispatch(actionsPageErrored(err)));
    };
}

