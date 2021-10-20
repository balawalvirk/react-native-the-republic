import {
  SET_ALL_ORDERS
} from '../actionTypes'


export const setAllOrders = data => {
    return {
        type: SET_ALL_ORDERS,
        payload: data,
    };
};



