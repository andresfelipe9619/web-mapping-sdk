import {
    LOAD_LAYERS_REQUEST,
    LOAD_LAYERS_ERROR,
    LOAD_LAYERS_SUCCESS,
    LOAD_LAYERS_QUERY,
    LOAD_LAYERS_QUERY_ERROR,
    LOAD_LAYERS_QUERY_SUCCESS,
    ZOOM_TO_LAYER,
    SELECT_LAYER
} from '../actions/constants/ActionTypes';


function loadLayersRequest(state = null, action) {
    switch (action.type) {
        case LOAD_LAYERS_REQUEST:
            return action.layersName;
        default:
            return state;
    }
}

function loadLayersSuccess(state = false, action) {
    switch (action.type) {
        case LOAD_LAYERS_SUCCESS:
            return action.layers; 
        default:
            return state;
    }
}

function loadLayersError(state = false, action) {
    switch (action.type) {
        case LOAD_LAYERS_ERROR:
            return action.hasErrored;
        default:
            return state;
    }
}




export default function userReducer(state = {}, action){
    return {
        loadLayersError: loadLayersError(state.loadLayersError, action),
        loadLayersSuccess: loadLayersSuccess(state.loadLayersSuccess, action),
        loadLayersRequest: loadLayersRequest(state.loadLayersRequest, action),
    }
}