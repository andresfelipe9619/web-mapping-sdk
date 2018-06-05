import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_TOTAL_PRODUCTS_FAILURE,
    FETCH_TOTAL_PRODUCTS_REQUEST,
    FETCH_TOTAL_PRODUCTS_SUCCESS

} from '../actions/constants/ActionTypes';

function fetchProductsFailure(state = false, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}


function fetchProductsRequest(state = false, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return action.bool;
        default:
            return state;
    }
}


function fetchProductsSuccess(state = null, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return action.products;
        default:
            return state;
    }
}

function fetchTotalProductsFailure(state = false, action) {
    switch (action.type) {
        case FETCH_TOTAL_PRODUCTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}


function fetchTotalProductsRequest(state = false, action) {
    switch (action.type) {
        case FETCH_TOTAL_PRODUCTS_REQUEST:
            return action.bool;
        default:
            return state;
    }
}


function fetchTotalProductsSuccess(state = null, action) {
    switch (action.type) {
        case FETCH_TOTAL_PRODUCTS_SUCCESS:
            return action.products;
        default:
            return state;
    }
}

export default function userReducer(state = {}, action) {
    return {
        fetchTotalProductsFailure: fetchTotalProductsFailure(state.fetchTotalProductsFailure, action),
        fetchTotalProductsRequest: fetchTotalProductsRequest(state.fetchTotalProductsRequest, action),
        fetchProductsSuccess: fetchProductsSuccess(state.fetchProductsSuccess, action),
        fetchProductsFailure: fetchProductsFailure(state.fetchProductsFailure, action),
        fetchProductsRequest: fetchProductsRequest(state.fetchProductsRequest, action),
        fetchProductsSuccess: fetchProductsSuccess(state.fetchProductsSuccess, action)

    }
}