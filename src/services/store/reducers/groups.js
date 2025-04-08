import {
    SET_MY_GROUPS,
    SET_MY_JOINED_GROUPS
} from '../actionTypes'

const INITIAL_STATE = {
    myGroups: [],
    myJoinedGroups: [],
};

const groupReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MY_GROUPS:
            return {
                ...state,
                myGroups: action.payload,
            };
        case SET_MY_JOINED_GROUPS:
            return {
                ...state,
                myJoindedGroups: action.payload,
            };
        default:
            return state;
    }
};

export default groupReducers