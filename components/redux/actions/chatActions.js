import axios from 'axios';
import { 
    START_LOADER, STOP_LOADER, GET_CHATS, GET_USER_CHATS, ADD_CHATS, ERROR
} from './type';
import Config from '../../utils/Config';

const api_url = Config.api_url;

const config = {
    headers: { 
    "Access-Control-Allow-Origin": "*",
    'encryptedd':'api-token'
}}

// ------Get Chats Action------
export const getAllChats = (userid,receiver_id) => (dispatch) => {

    dispatch({
        type: START_LOADER,
    }); 
    const formdata = JSON.stringify({"user_id":userid,"receiver_id":receiver_id})
    
    axios.post(api_url+'chat', formdata ,config)
    .then((res) => {
        if(res.data.status === "true") {
            dispatch({
                type: GET_CHATS,
                payload: res.data.data,
            });
        }
        else {              
            dispatch({
                type: GET_CHATS,
                payload: [],
            });
        }       
        dispatch({
            type: STOP_LOADER,
        });    
    })
    .catch((err) => {
        dispatch({
            type: STOP_LOADER,
        });
        alert(err);
    });    
}

// ------Get Chats History------
export const getChatHistory = (userid) => (dispatch) => {

    dispatch({
        type: START_LOADER,
    }); 
    const formdata = JSON.stringify({"user_id":userid})
    
    axios.post(api_url+'chat/chat_history', formdata ,config)
    .then((res) => {
        if(res.data.status === "true") {
            dispatch({
                type: GET_USER_CHATS,
                payload: res.data.data,
            });
        }
        else {
            dispatch({
                type: GET_USER_CHATS,
                payload: [],
            });
        }       
        dispatch({
            type: STOP_LOADER,
        });    
    })
    .catch((err) => {
        dispatch({
            type: STOP_LOADER,
        });
        alert(err);
    });    
}

// ------Add Chats Action------
export const sendMessage = (user_id,receiver_id,message) => (dispatch) => {

    // dispatch({
    //     type: START_LOADER,
    // });
    const formdata = JSON.stringify({"user_id":user_id,"receiver_id":receiver_id,"message":message})
    axios.post(api_url+'chat/send_a_message', formdata ,config)
    .then((res) => {
        if(res.data.status === "true") {
            dispatch({
                type: ADD_CHATS,
                payload: res.data.data,
            });
            // dispatch(getAllChats(user_id,receiver_id))
        }
        else {
            dispatch({
                type: ADD_CHATS,
                payload: [],
            });
        }
        dispatch({
            type: STOP_LOADER,
        });
    })
    .catch((err) => {
        dispatch({
            type: STOP_LOADER,
        });
        alert(err);
    });    
}

/* export const receiverMsg = (user_id,receiver_id,message) => (dispatch) => {
    
    const formdata = JSON.stringify({"user_id":receiver_id,"receiver_id":user_id,"message":message})
    axios.post(api_url+'chat/send_a_message', formdata ,config)
    .then((res) => {
        if(res.data.status === "true") {
            dispatch({
                type: ADD_CHATS,
                payload: res.data,
            });
        }
        if(res.data.status === "false") {        
            dispatch({
                type: ERROR,
            });      
        }
        dispatch({
            type: STOP_LOADER,
        });
    })
    .catch((err) => {
        dispatch({
            type: STOP_LOADER,
        });
        alert(err);
    });    
} */