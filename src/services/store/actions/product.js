import { 
    SET_PRODUCT_CATEGORIES,
    SET_PRODUCT_ITEMS,
    SET_PRODUCT_MANUFACTURERS,
    SET_PRODUCT_CALIBERS,
    SET_PRODUCT_ACTIONS,
    SET_PRODUCT_CONDITIONS,
 } from '../actionTypes'


export const setProductCategories = data => {
    return {
        type: SET_PRODUCT_CATEGORIES,
        payload: data,
    };
};

export const setProductItems = data => {
    return {
        type: SET_PRODUCT_ITEMS,
        payload: data,
    };
};

export const setProductManufacturers = data => {
    return {
        type: SET_PRODUCT_MANUFACTURERS,
        payload: data,
    };
};

export const setProductCalibers = data => {
    return {
        type: SET_PRODUCT_CALIBERS,
        payload: data,
    };
};

export const setProductActions = data => {
    return {
        type: SET_PRODUCT_ACTIONS,
        payload: data,
    };
};

export const setProductConditions = data => {
    return {
        type: SET_PRODUCT_CONDITIONS,
        payload: data,
    };
};


