import { combineReducers } from 'redux';

import userReducer from './user';
import productReducers from './product';
import orderReducers from './orders';
import groupReducers from './groups';

export default combineReducers({
    user: userReducer,
    product: productReducers,
    order: orderReducers,
    group: groupReducers,
});


//export * from './user'
