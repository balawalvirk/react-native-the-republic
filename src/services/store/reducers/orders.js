import {
   SET_ALL_ORDERS
} from '../actionTypes'

const INITIAL_STATE = {
    allOrders: null,
};

const orderReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ALL_ORDERS:
            return {
                ...state,
                allOrders: action.payload,
            };
        default:
            return state;
    }
};


export default orderReducers