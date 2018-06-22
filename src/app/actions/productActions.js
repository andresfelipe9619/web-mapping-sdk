import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_TOTAL_PRODUCT_REQUEST,
FETCH_TOTAL_PRODUCT_SUCCESS,
FETCH_TOTAL_PRODUCT_FAILURE
} from './constants/ActionTypes';


function fetchProductsRequest(bool) {
    return { type: FETCH_PRODUCTS_REQUEST, bool };
}

function fetchProductsSuccess(products) {
    return { type: FETCH_PRODUCTS_SUCCESS, products };
}

function fetchProductsFailure(error) {
    return { type: FETCH_PRODUCTS_FAILURE, error };

}

function fetchTotalProductRequest(bool) {
    return { type: FETCH_TOTAL_PRODUCT_REQUEST, bool };
}

function fetchTotalProductSuccess(products) {
    return { type: FETCH_TOTAL_PRODUCT_SUCCESS, products };
}

function fetchTotalProductFailure(error) {
    return { type: FETCH_TOTAL_PRODUCT_FAILURE, error };

}


export function fetchProducts() {
    
    return dispatch => {
        dispatch(fetchProductsRequest(true));

        fetch(`http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:procrudo&outputFormat=application%2Fjson`).then(response => {
        // fetch(`http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:mallas&outputFormat=application%2Fjson`).then(response => {
            if (!response.ok) {
                // dispatch(alertError(response));
                return Promise.reject(response.statusText);
            }
            return response.json();
        }).then((response) => {
            dispatch(fetchProductsRequest(false));
            dispatch(fetchProductsSuccess(response.features));
        }).catch((err) => {
            // dispatch(alertError(err));
            dispatch(fetchProductsFailure(err));
        });
    };
    
}

export function fetchTotalProduct() {
    
    return dispatch => {
        dispatch(fetchTotalProductRequest(true));

        fetch(`http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:cantidadProductoCompradoCliente&viewparams=cliente:51;producto:g38&outputFormat=application%2Fjson`).then(response => {
            if (!response.ok) {
                // dispatch(alertError(response));
                return Promise.reject(response.statusText);
            }
            return response.json();
        }).then((response) => {
            dispatch(fetchTotalProductRequest(false));
            dispatch(fetchTotalProductSuccess(response.features));
        }).catch((err) => {
            // dispatch(alertError(err));
            dispatch(fetchTotalProductFailure(err));
        });
    };
    
}