import {
    LOAD_LAYERS_REQUEST,
    LOAD_LAYERS_ERROR,
    LOAD_LAYERS_SUCCESS,
    FETCH_LAYERS_FEATURES_REQUEST,
    FETCH_LAYERS_FEATURES_ERROR,
    FETCH_LAYERS_FEATURES_SUCCESS,
    FILTER_LAYERS,
    UPDATE_LAYERS_FEATURES,
    SELECT_LAYER
} from './constants/ActionTypes';

import WMSCapabilitiesFormat from 'ol/format/wmscapabilities';

function loadLayersRequest(layersName) {
    return { type: LOAD_LAYERS_REQUEST, layersName };
}

function loadLayersSuccess(layers) {
    return { type: LOAD_LAYERS_SUCCESS, layers };
}

function loadLayersError(error) {
    return { type: LOAD_LAYERS_ERROR, hasErrored: error };

}


function fetchLayersFeaturesSuccess(layers) {
    return { type: FETCH_LAYERS_FEATURES_SUCCESS, layers };
}

function fetchLayersFeaturesRequest(layers) {
    return { type: FETCH_LAYERS_FEATURES_REQUEST, layers };

}

function fetchLayersFeaturesError(error) {
    return { type: FETCH_LAYERS_FEATURES_ERROR, hasErrored: error };

}

export function updateLayersFeatures(features) {
    return { type: UPDATE_LAYERS_FEATURES, features };
}

export function filterLayers(filter) {
    return { type: FILTER_LAYERS, filter };
}

export function selectLayer(layerName) {
    return { type: SELECT_LAYER, layerName };
}

export function clearFilterLayers() {
    return (dispatch)=> {
        dispatch(filterLayers(null))
    }
}

export function clearSelectLayer() {
    return (dispatch)=> {
        dispatch(selectLayer(null))
    }
}




export function loadLayers(layers) {
    return (dispatch) => {
        dispatch(loadLayersRequest(layers));
        const url = 'http://localhost:8080/geoserver/cahibi1/wms?service=WMS&request=GetCapabilities';
        fetch(url).then(
            response => response.text(),
            error => console.error('An error occured.', error)
        ).then((xml) => {
            const info = new WMSCapabilitiesFormat().read(xml);
            const root = info.Capability.Layer.Layer;

            console.log('ROOT WMS', root)
            dispatch(loadLayersRequest(null));
            let mLayers = []
            for (let layer of root) {
                // if (layers.indexOf(layer.Title) > 0) {
                //     delete layer.CRS
                    mLayers.push(layer)
                // }
            }

            return mLayers
        }).then((layers) => dispatch(loadLayersSuccess(layers))).catch((err) => dispatch(loadLayersError(err)));
    };
}

export function loadLayersFeatures(layers) {
    return (dispatch) => {
        dispatch(fetchLayersFeaturesRequest(layers));
        fetchFeatures(layers).then((response) => {
            dispatch(fetchLayersFeaturesRequest(false));
            dispatch(fetchLayersFeaturesSuccess(response));
        }).catch((err) => {
            // dispatch(alertError(err));
            dispatch(fetchLayersFeaturesError(err));
        });
    }
}


function fetchFeatures(layers) {
    return Promise.all(layers.map(layer => {
        let url = `http://localhost:8080/geoserver/cahibi1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:${layer}&maxFeatures=50&outputFormat=application%2Fjson`;
        return fetch(url)
    }))
    .then(responses =>  Promise.all(responses.map(res => res.json())))
    .then(features=>features)
    .catch(err=> console.log('Error catching features', err))
}
