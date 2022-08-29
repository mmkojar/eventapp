import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, UPDATE_PROFILE, AUTH_ERROR, GET_USER } from '../actions/type';

const initialState = {
    isAuthenticated: false,    
    user: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case UPDATE_PROFILE:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,                
            };
        case GET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user:action.payload,
            };
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,                
                user:null,
            };
        default:
            return state;
    }
}