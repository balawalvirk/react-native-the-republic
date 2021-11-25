import {
    SET_PRODUCT_CATEGORIES,
    SET_PRODUCT_ITEMS,
    SET_PRODUCT_MANUFACTURERS,
    SET_PRODUCT_CALIBERS,
    SET_PRODUCT_ACTIONS,
    SET_PRODUCT_CONDITIONS,
} from '../actionTypes'

const INITIAL_STATE = {
    categories: null,
    items: [],
    manufacturers: [],
    calibers: [],
    actions: [],
    conditions: [],

};

const productReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PRODUCT_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        case SET_PRODUCT_ITEMS:
            return {
                ...state,
                items: action.payload,
            };
        case SET_PRODUCT_MANUFACTURERS:
            return {
                ...state,
                manufacturers: action.payload,
            };
        case SET_PRODUCT_CALIBERS:
            return {
                ...state,
                calibers: action.payload,
            };
        case SET_PRODUCT_ACTIONS:
            return {
                ...state,
                actions: action.payload,
            };
        case SET_PRODUCT_CONDITIONS:
            return {
                ...state,
                conditions: action.payload,
            };
        default:
            return state;
    }
};


export default productReducers