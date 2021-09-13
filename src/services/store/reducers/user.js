import {
   SET_USER_DETAIL
} from '../actionTypes'

const INITIAL_STATE = {
    userDetail: null,
  
};

const userReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER_DETAIL:
            return {
                ...state,
                userDetail: action.payload,
            };
        default:
            return state;
    }
};


export default userReducers