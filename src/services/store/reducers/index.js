import { combineReducers } from 'redux';

import userReducer from './user';
import appReducers from './app';
 
export default combineReducers({
    user: userReducer,
    service:appReducers
});


//export * from './user'
