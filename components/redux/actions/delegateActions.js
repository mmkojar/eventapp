import axios from 'axios';
import { 
    START_LOADER, STOP_LOADER, GET_AGENDA,  GET_ABOUT_EVENT, 
    GET_SPEAKERS,  GET_POLLS, UPDATE_POLLS, GET_DELEGATES, GET_POLL
} from './type';
import Config from '../../utils/Config';

const api_url = Config.api_url;

const config = {
    headers: { 
    "Access-Control-Allow-Origin": "*",
    'encryptedd':'api-token'
}}

// ------Get Delegates Action------
export const getAllDelegates = () => (dispatch) => {

    fetchAxios(dispatch,'user/get',GET_DELEGATES);
}

// ------About Event------
export const getAboutEvent = () => (dispatch) => {

    fetchAxios(dispatch,'about',GET_ABOUT_EVENT); 
}

// ------Speakers------
export const getSpeakers = () => (dispatch) => {

    fetchAxios(dispatch,'speaker',GET_SPEAKERS);
}

// ------Agenda------
export const getAgenda = () => (dispatch) => {

    fetchAxios(dispatch,'agenda',GET_AGENDA);
}

// ------Polling------
export const getPollsList = () => (dispatch) => {

    fetchAxios(dispatch,'polling/polls',GET_POLLS);
}

// ------Polling------
export const getPollView = (id) => (dispatch) => {

    fetchAxios(dispatch,`polling/polls/${id}`,GET_POLL);
}

export const updatePolls = (pid,paid,user_id) => (dispatch) => {

    const formdata = new FormData();
    formdata.append('pid',pid)
    formdata.append('paid',paid)
    formdata.append('user_id',user_id)

    dispatch({
        type: START_LOADER,
    });
    axios.post(api_url+'polling/updateVotes', formdata ,config)
    .then((res) => {
        if(res.data.status === "true") {
            dispatch({
                type: UPDATE_POLLS,
                payload: res.data.data,
            });
            dispatch(getPollView(pid));
        }
        else {
            dispatch({
                type: UPDATE_POLLS,
                payload: [],
            });
            alert(res.data.message)
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

const fetchAxios = (dispatch,param,action) => {

    dispatch({
        type: START_LOADER,
    });
    axios.get(api_url+param+'/', config)
    .then((res) => {
        // console.log("action:",res.data);
        if(res.data && res.data.status === "true") {
            dispatch({
                type: action,
                payload: res.data.data,
            });
        }
        else {
            dispatch({
                type: action,
                payload: [],
            });  
        }
        /* if(res.data.status === "false") {
            dispatch({
                type: action,
                payload: [],
            });    
        } */
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