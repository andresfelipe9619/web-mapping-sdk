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

export function updateMapFilter(filter){
    return dispatch=>{
        dispatch(filterLayers(filter))
        dispatch(updateMapFeatures(filter))
    }
}

export function filterLayers(filter) {
    return { type: FILTER_LAYERS, filter };
}

export function selectLayer(layerName) {
    return { type: SELECT_LAYER, layerName };
}

export function clearFilterLayers() {
    return (dispatch) => {
        dispatch(filterLayers(null))
    }
}

export function clearSelectLayer() {
    return (dispatch) => {
        dispatch(selectLayer(null))
    }
}

function updateMapFeaturesSuccess(features) {
    return { type: UPDATE_FEATURES_SUCCESS, features };
}

function updateMapFeaturesError(error) {
    return { type: UPDATE_FEATURES_ERROR, error };
}

function updateMapFeaturesRequest (filter) {
    return { type: UPDATE_FEATURES_REQUEST, filter };
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
                for(let i in layers){
                    if(layer.Title === layers[i]){
                        mLayers.push(layer)
                    }
                }

            }

            return mLayers
        }).then((layers) => dispatch(loadLayersSuccess(layers))).catch((err) => dispatch(loadLayersError(err)));
    };
}

export function updateMapFeatures(filter) {
    return (dispatch) => {
        dispatch(updateMapFeaturesRequest(filter));
        let url = ''
        let filterString = ''
        if(filter.calidad){
            filterString = `cliente:${filter.client};producto:${filter.product};calificacion:${filter.calidad};zona:${filter.zona}`
            url = `http://localhost:8080/geoserver/cahibi1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:mallasOrigenProductoCliente&maxFeatures=50&outputFormat=application%2Fjson&VIEWPARAMS=${filterString}`;
        }else if(filter.desde){
            filterString = `fechae>${filter.desde} and fechae<${filter.hasta} and idzona=${filter.zona}`
            url = `http://localhost:8080/geoserver/cahibi1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:mallas&maxFeatures=100&outputFormat=application%2Fjson&CQL_FILTER=${filterString}`;
        }else if(filter.llegada){
            filterString = `llegada:${filter.llegada};partida:8`
            url = `http://localhost:8080/geoserver/cahibi1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:recorridoAProducto&maxFeatures=100&outputFormat=application%2Fjson&VIEWPARAMS=${filterString}`;
        }else{
            filterString = `${filter.atributos}${filter.comparacion}${filter.valor}`
            url = `http://localhost:8080/geoserver/cahibi1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:${filter.layer}&maxFeatures=150&outputFormat=application%2Fjson&CQL_FILTER=${filterString}`;
        }
        fetch(url).then(
            response => response.json(),
            error => console.error('An error occured.', error)
        ).then(features => {
            dispatch(updateMapFeaturesRequest(null));
            dispatch(updateMapFeaturesSuccess(features));
        }).catch(err => {
            dispatch(updateMapFeaturesError(err));
        })
    }
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
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(features => features)
        .catch(err => console.log('Error catching features', err))
}
