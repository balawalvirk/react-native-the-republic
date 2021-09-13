import { 
    SET_USER_DETAIL } from '../actionTypes'


export const setUserDetail = data => {
    return {
        type: SET_USER_DETAIL,
        payload: data,
    };
};


