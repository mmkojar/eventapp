import React,{ useEffect } from 'react'
import { Alert } from 'react-native';

function MsgAlerts({msg,status}) {

    useEffect(() => {
        getMsg();
    }, [])

    const getMsg = () => {
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
        
    return (
        <></>
    );
}

export default MsgAlerts
