
import {
    FETCH_USER_DISPATCHEDS_REQUEST,
    FETCH_USER_DISPATCHEDS_SUCCESS,
    FETCH_USER_DISPATCHEDS_FAILURE,
    FETCH_DISPATCHEDS_REQUEST,
    FETCH_DISPATCHEDS_SUCCESS,
    FETCH_DISPATCHEDS_FAILURE,
} from '../actions/constants/ActionTypes';

function fetchDispatchedsFailure(state = false, action) {
    switch (action.type) {
        case FETCH_DISPATCHEDS_FAILURE:
            return action.error;
        default:
            return state;
    }
}


function fetchDispatchedsRequest(state = false, action) {
    switch (action.type) {
        case FETCH_DISPATCHEDS_REQUEST:
            return action.bool;
        default:
            return state;
    }
}


function fetchDispatchedsSuccess(state = null , action) {
    switch (action.type) {
        case FETCH_DISPATCHEDS_SUCCESS:
            return action.dispatcheds; 
        default:
            return state;
    }
}

function fetchUserDispatchedsFailure(state = false, action) {
    switch (action.type) {
        case FETCH_USER_DISPATCHEDS_FAILURE:
            return action.error;
        default:
            return state;
    }
}


function fetchUserDispatchedsRequest(state = false, action) {
    switch (action.type) {
        case FETCH_USER_DISPATCHEDS_REQUEST:
            return action.bool;
        default:
            return state;
    }
}


function fetchUserDispatchedsSuccess(state = null , action) {
    switch (action.type) {
        case FETCH_USER_DISPATCHEDS_SUCCESS:
            return action.dispatcheds; 
        default:
            return state;
    }
}

export default function dispatchedsReducer(state = {}, action){
    return {
        fetchUserDispatchedsFailure: fetchUserDispatchedsFailure(state.fetchUserDispatchedsFailure, action),
        fetchUserDispatchedsRequest: fetchUserDispatchedsRequest(state.fetchUserDispatchedsRequest, action),
        fetchUserDispatchedsSuccess: fetchUserDispatchedsSuccess(state.fetchUserDispatchedsSuccess, action),
        fetchDispatchedsFailure: fetchDispatchedsFailure(state.fetchDispatchedsFailure, action),
        fetchDispatchedsRequest: fetchDispatchedsRequest(state.fetchDispatchedsRequest, action),
        fetchDispatchedsSuccess: fetchDispatchedsSuccess(state.fetchDispatchedsSuccess, action)
    }
}