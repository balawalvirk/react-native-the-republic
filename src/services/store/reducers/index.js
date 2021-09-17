import { combineReducers } from 'redux';

import userReducer from './user';
import productReducers from './product';
 
export default combineReducers({
    user: userReducer,
    product:productReducers
});


//export * from './user'
