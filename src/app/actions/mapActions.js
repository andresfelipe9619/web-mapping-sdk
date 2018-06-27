import {
    LOAD_LAYERS_REQUEST,
    LOAD_LAYERS_ERROR,
    LOAD_LAYERS_SUCCESS,
    LOAD_LAYERS_QUERY_REQUEST,
    LOAD_LAYERS_QUERY_ERROR,
    LOAD_LAYERS_QUERY_SUCCESS,
    ZOOM_TO_LAYER,
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


function loadLayersQuerySuccess(layers) {
    return { type: LOAD_LAYERS_QUERY_SUCCESS, layers };
}

function loadLayersQueryRequest(query) {
    return { type: LOAD_LAYERS_QUERY_REQUEST, query };

}

function loadLayersQueryError(error) {
    return { type: LOAD_LAYERS_QUERY_ERROR, hasErrored: error };

}

export function zoomToLayer(layer) {
    return { type: ZOOM_TO_LAYER, layer };
}

export function selectLayer(layer) {
    return { type: SELECT_LAYER, layer };
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

                if (layers.indexOf(layer.Title) > 0) {
                    mLayers.push(layer)
                }
            }

            return mLayers
        }).then((layers) => dispatch(loadLayersSuccess(layers))).catch((err) => dispatch(loadLayersError(err)));
    };
}
