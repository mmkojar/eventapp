import { 
    GET_ABOUT_EVENT, GET_SPEAKERS, GET_AGENDA, GET_DELEGATES, 
    GET_POLLS, CLEAR_DATA, ERROR 
} from '../actions/type';

const initialState = {
    about:null,
    speaker:null,
    agenda:null,
    delegates: null,
    polls:null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ABOUT_EVENT:
            return {
                ...state,
                about:action.payload,
            };
        case GET_SPEAKERS:
            return {
                ...state,                
                speaker:action.payload,
            };
        case GET_AGENDA:
            return {
                ...state,                
                agenda:action.payload,
            };
        case GET_DELEGATES:
            return {
                ...state,
                delegates:action.payload,
            };        
        case GET_POLLS:
            return {
                ...state,
                polls:action.payload,
            };
        case CLEAR_DATA:
            return { 
                ...state,                
                delegates:null,
                chats:null,
            };
        case ERROR:
            return {
                ...state,                
                delegates:null,
                chats:null,
            };
        default:
            return state;
    }
}