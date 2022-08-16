import React from 'react'
import { View,Text,Image,StyleSheet,ScrollView,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Card,TextInput  } from 'react-native-paper';
import CustomButtons from '../components/utils/CustomButtons';

function AttendeeProfile({ route, navigation }) {

    const { id, full_name,city,user_image } = route.params;

    const pressHandler = () => {
        navigation.navigate('ChatBox', {
            id: id,
            full_name: full_name,
        });
    }
    return (
        <ScrollView>
            <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
                <View style={styles.profieMain}>
                    <Card>
                        <Card.Content>
                            <Image                             
                                style={{height:100,width:100,borderRadius:50,alignSelf:'center'}}                                                                 
                                source={(user_image !== null) ? {uri:user_image} : require('../assets/user.png')} 
                            />
                            <Text></Text>
                            <TextInput
                                mode='flat'
                                label='First Name'
                                value={full_name}
                                disabled
                            />
                            <Text></Text>
                            <TextInput
                                mode='flat'
                                label='City'
                                value={city}
                                disabled
                            />                 
                        </Card.Content>
                        <Card.Actions style={styles.action}>
                            <CustomButtons title="Request meeting" pressHandler={()=>{}}></CustomButtons>                            
                            <CustomButtons title="Chat" pressHandler={pressHandler}></CustomButtons>
                        </Card.Actions>
                        {/* {isLoading ? <Spinner /> : null} */}
                    </Card>
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
        justifyContent:'space-around'
    }
})
export default AttendeeProfile
