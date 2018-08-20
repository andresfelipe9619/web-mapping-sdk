import {
    LOAD_LAYERS_REQUEST,
    LOAD_LAYERS_ERROR,
    LOAD_LAYERS_SUCCESS,
    FETCH_LAYERS_FEATURES_REQUEST,
    FETCH_LAYERS_FEATURES_ERROR,
    FETCH_LAYERS_FEATURES_SUCCESS,
    FILTER_LAYERS,
    UPDATE_FEATURES_SUCCESS,
    UPDATE_FEATURES_ERROR,
    UPDATE_FEATURES_REQUEST,
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



function selectedLayer(state = null, action) {
    switch (action.type) {
        case SELECT_LAYER:
            return action.layerName;
        default:
            return state;
    }
}

function currentFilter(state = null, action) {
    switch (action.type) {
        case FILTER_LAYERS:
            return action.filter;
        default:
            return state;
    }
}

function currentMapFeaturesSuccess(state = null, action) {
    switch (action.type) {
        case UPDATE_FEATURES_SUCCESS:
            return action.features;
        default:
            return state;
    }
}
function currentMapFeaturesError(state = null, action) {
    switch (action.type) {
        case UPDATE_FEATURES_ERROR:
            return action.error;
        default:
            return state;
    }
}
function currentMapFeaturesRequest(state = null, action) {
    switch (action.type) {
        case UPDATE_FEATURES_REQUEST:
            return action.filter;
        default:
            return state;
    }
}

function fetchLayersFeatures(state = null, action) {
    switch (action.type) {
        case FETCH_LAYERS_FEATURES_REQUEST:
            return action.layers;
        default:
            return state;
    }
}

function fetchLayersFeaturesSuccess(state = false, action) {
    switch (action.type) {
        case FETCH_LAYERS_FEATURES_SUCCESS:
            return action.layers;
        default:
            return state;
    }
}

function fetchLayersFeaturesError(state = false, action) {
    switch (action.type) {
        case FETCH_LAYERS_FEATURES_ERROR:
            return action.hasErrored;
        default:
            return state;
    }
}




export default function mapReducer(state = {}, action) {
    return {
        fetchLayersFeaturesError: fetchLayersFeaturesError(state.fetchLayersFeaturesError, action),
        fetchLayersFeaturesSuccess: fetchLayersFeaturesSuccess(state.fetchLayersFeaturesSuccess, action),
        fetchLayersFeatures: fetchLayersFeatures(state.fetchLayersFeatures, action),

        loadLayersError: loadLayersError(state.loadLayersError, action),
        loadLayersSuccess: loadLayersSuccess(state.loadLayersSuccess, action),
        loadLayersRequest: loadLayersRequest(state.loadLayersRequest, action),

        selectedLayer: selectedLayer(state.selectedLayer, action),
        currentFilter: currentFilter(state.currentFilter, action),

        currentMapFeaturesSuccess: currentMapFeaturesSuccess(state.currentMapFeaturesSuccess, action),
        currentMapFeaturesError: currentMapFeaturesError(state.currentMapFeaturesError, action),
        currentMapFeaturesRequest: currentMapFeaturesRequest(state.currentMapFeaturesRequest, action),
    }
}