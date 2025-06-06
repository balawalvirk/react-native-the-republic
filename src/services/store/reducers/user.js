import {
    SET_USER_DETAIL,
    SET_CREDIT_CARDS,
    SET_REPORTS,
    SET_CURRENT_LOCATION,
    SET_STRIPE_ACCOUNT_DETAIL
} from '../actionTypes'

const INITIAL_STATE = {
    userDetail: null,
    creditCards: [],
    reports: null,
    currentLocation: null,
    stripeAccountDetail: null

};

const userReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER_DETAIL:
            return {
                ...state,
                userDetail: action.payload,
            };
        case SET_CREDIT_CARDS:
            return {
                ...state,
                creditCards: action.payload,
            };
        case SET_REPORTS:
            return {
                ...state,
                reports: action.payload,
            };
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.payload,
            };
        case SET_STRIPE_ACCOUNT_DETAIL:
            return {
                ...state,
                stripeAccountDetail: action.payload,
            };
        default:
            return state;
    }
};


export default userReducers