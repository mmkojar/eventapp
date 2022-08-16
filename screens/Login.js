import React, { useState,useEffect } from 'react';
import {  View, Text, StyleSheet, Alert, ImageBackground, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import CustomButtons from '../components/utils/CustomButtons';
import { useDispatch } from 'react-redux';
import { loginAction } from '../components/redux/actions/authActions';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { fcmService } from '../services/FCMService';

function Login() {

    useEffect(() => {
        fcmService.getToken(onRegister)
    }, [])

    const onRegister = (token) => {
        SetToken(token);
    }
        
    const [identity,SetIdentity] = useState('');
    const [token,SetToken] = useState('');

    const dispatch = useDispatch();

    const pressHandler = (e) => {
        
        e.preventDefault();
        if(identity == '') {
            Alert.alert('Error','Enter Email Id',[
                {text: 'OK'}
              ],{cancelable:true})
        }
        else {            
            Keyboard.dismiss();
            dispatch(loginAction(token,Platform.OS,identity));
        }
    }

    return (
        <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
            <View style={styles.loginMain}>
                {/* <ImageBackground source={require('../assets/login_screen.png')} resizeMode="cover" style={{flex: 1,justifyContent:'center',}}> */}                    
                    <Card style={styles.card}>
                        <Text style={styles.heading}>Login To Continue !</Text> 
                        <Card.Content>
                            <TextInput
                                mode='outlined'
                                label='Enter Email'
                                onChangeText={(val) => SetIdentity(val)}
                                keyboardType='email-address'
                                style={styles.textinput}
                            />
                        </Card.Content>
                        <Card.Actions style={styles.action}>
                            <CustomButtons title="Login" pressHandler={pressHandler}></CustomButtons>
                        </Card.Actions>                        
                    </Card>
                {/* </ImageBackground> */}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    loginMain:{
        flex:1,
        justifyContent:'flex-end',
        backgroundColor:'#16191a',
    },
    card:{
        paddingBottom:100,
        paddingTop:50,
        borderWidth:1,
        // borderRadius:20,
        borderTopLeftRadius:50,
        // marginTop:100
    },
    heading: {
        fontSize:30,
        textAlign:'center',
        marginVertical:30,
        color:'#000000',
        fontFamily:'VarelaRound-Regular'
    },
    action : {
        marginTop:30,
        justifyContent:'center'
    }
})

export default Login
