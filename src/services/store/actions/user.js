import { 
    SET_USER_DETAIL,SET_CREDIT_CARDS } from '../actionTypes'


export const setUserDetail = data => {
    return {
        type: SET_USER_DETAIL,
        payload: data,
    };
};

export const setCreditCards = data => {
    return {
        type: SET_CREDIT_CARDS,
        payload: data,
    };
};




