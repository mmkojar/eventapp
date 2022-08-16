import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,ScrollView,Alert,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Card,TextInput } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomButtons from '../components/utils/CustomButtons';
import { useDispatch, useSelector } from 'react-redux';
import { profileAction,logoutAction } from '../components/redux/actions/authActions';

function Profile() {    

    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);       
    
    const [firstname,Setfirstname] = useState(authData.data.first_name);
    const [lastname,Setlastname] = useState(authData.data.last_name);
    const [email,SetEmail] = useState(authData.data.email);
    const [phone,SetPhone] = useState(authData.data.phone);
    const [city,SetCity] = useState(authData.data.city);

    const cutomAlert = (msg) => {
        Alert.alert('Error',msg,[
            {text: 'OK'}
        ],{cancelable:true})
    }
   
    const pressHandler = (e) => {

        e.preventDefault();
        
        if(firstname == '') {
            cutomAlert('Enter First Name');            
        }
        else if(lastname == '') {
            cutomAlert('Enter Last Name');            
        }
        else if(city == '') {
            cutomAlert('Enter city');            
        }
        else {
            Keyboard.dismiss();
            dispatch(profileAction(authData.data.user_id,firstname,lastname,phone,email,city));
        }        
    }

    const logout = () => {
        Alert.alert('Message','Are You Sure?',[
        {text: 'Yes', onPress:() => {                
            dispatch(logoutAction());
        }},
        {text:'No'}
        ],{cancelable:true})
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
                <View style={styles.profieMain}>
                    <Card style={{borderRadius:18}}>
                        <Card.Content>
                            <FontAwesome5 
                            name="user-circle"
                            size={60}
                            color='#000'
                            style={{marginBottom:20,textAlign:'center'}}
                            />
                            <TextInput
                                mode='outlined'
                                label='First Name'
                                keyboardType='default'
                                value={firstname}
                                onChangeText={(val) => Setfirstname(val)}
                            />
                            <Text></Text>
                            <TextInput
                                mode='outlined'
                                label='Last Name'
                                keyboardType='default'
                                value={lastname}
                                onChangeText={(val) => Setlastname(val)}
                            />
                            <Text></Text>
                            <TextInput
                                mode='outlined'
                                label='Enter Email'
                                keyboardType='email-address'
                                value={email}
                                onChangeText={(val) => SetEmail(val)}
                                disabled={true}
                            />
                            <Text></Text>
                            <TextInput
                                mode='outlined'
                                label='Phone'
                                keyboardType='number-pad'
                                value={phone}
                                onChangeText={(val) => SetPhone(val)}
                                disabled={true}
                            />
                            <Text></Text>
                            <TextInput
                                mode='outlined'
                                label='City'
                                keyboardType='default'
                                value={city}
                                onChangeText={(val) => SetCity(val)}
                            />                 
                        </Card.Content>
                        <Card.Actions style={styles.action}>
                            <CustomButtons title="Update" pressHandler={pressHandler}></CustomButtons>
                        </Card.Actions>
                    </Card>
                    <View style={{marginVertical:10,width:150,alignSelf:'center'}}>
                        <CustomButtons title="Logout" pressHandler={logout}></CustomButtons>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    profieMain:{
        flex:1,
        marginVertical:30,
        backgroundColor:'#f1efea',
    },
    action : {
        marginVertical:16,
        justifyContent:'center'
    }
})
export default Profile
