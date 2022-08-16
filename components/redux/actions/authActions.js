import axios from 'axios';
import { Alert } from 'react-native';
import { START_LOADER, STOP_LOADER, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, UPDATE_PROFILE, AUTH_ERROR, GET_USER } from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../utils/Config';
import storage from 'redux-persist/lib/storage'

const api_url = Config.api_url;

const config = { 
    headers: { 
    "Access-Control-Allow-Origin": "*",
    'encryptedd':'api-token'
}}

const getAlertMsg = (msg,status) => {
    if(msg) {
        if(msg !== null) {
            if(msg && status == "true") {
                Alert.alert('Success',msg,[
                    {text: 'OK'}
                  ],{cancelable:true})
            }
            if(msg && status == "false") {
                Alert.alert('Error',msg,[
                    {text: 'OK'}
                  ],{cancelable:true})
            }
        }
    }
}

//  ------Login Action------
export const loginAction = (device_notification_id,devicetype,identity) => (dispatch) => {

    dispatch({
        type: START_LOADER,
    });

    const formdata = JSON.stringify({device_notification_id,devicetype,identity})
    axios.post(api_url+'login', formdata, config)
    .then((res) => {       
        // console.log(res);
        if(res.data.status === "true") {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            AsyncStorage.setItem('userId',res.data.data.user_id);
        }
        if(res.data.status === "false") {        
            dispatch({
                type: LOGIN_FAIL,
            });
            getAlertMsg(res.data.message,res.data.status)
        }
        dispatch({
            type: STOP_LOADER,
        });
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: STOP_LOADER,
        });
        alert(err);
    });
};

// ------Get User Action------
/* export const getUserData = (id) => (dispatch) => {    

    dispatch({
        type: START_LOADER,
    });
    axios.get(api_url+'user/get/'+id, config)
    .then((res) => {               
        if(res.data.status === "true") {
            dispatch({
                type: GET_USER,
                payload: res.data,
            });
        }
        if(res.data.status === "false") {        
            dispatch({
                type: AUTH_ERROR,
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
 */
//  ------Profile Action------
export const profileAction = (id,first_name,last_name,phone,email,city) => (dispatch) => {

    dispatch({
        type: START_LOADER,
    });
    const formdata = JSON.stringify({first_name,last_name,phone,email,city})
    
    axios.post(api_url+'user/edit/'+id, formdata, config)
    .then((res) => {   
        console.log(res.data);     
        if(res.data.status === "true") {
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data,
            });
            getAlertMsg(res.data.message,res.data.status)
        }
        if(res.data.status === "false") {        
            dispatch({
                type: AUTH_ERROR,
            });
            getAlertMsg(res.data.message,res.data.status)
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
};

// ------Logout Action------
export const logoutAction = () => (dispatch) => {
    
    dispatch({
        type: START_LOADER,
    });
    
    try {
        storage.removeItem('persist:root')
        dispatch({
            type: LOGOUT_SUCCESS,
        });
        dispatch({
            type: STOP_LOADER,
        });
    } catch(err) {
        dispatch({
            type: STOP_LOADER,
        });
        alert(err);
    }    
};

