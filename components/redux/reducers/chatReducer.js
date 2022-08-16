import { ADD_CHATS, GET_CHATS } from "../actions/type";

const initialState = {
    data:null,    
}

export default function (state=initialState,action) {
    switch(action.type) {
        case GET_CHATS:
            return {
                ...state,
                data:action.payload
            };
        case ADD_CHATS:
            return {                
                data:[...action.payload, ...state.data]
            };
        default:
            return state;
    }
}