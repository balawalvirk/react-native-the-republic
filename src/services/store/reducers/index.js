import { combineReducers } from 'redux';

import userReducer from './user';
import productReducers from './product';
import orderReducers from './orders';
 
export default combineReducers({
    user: userReducer,
    product:productReducers,
    order:orderReducers,
});


//export * from './user'
