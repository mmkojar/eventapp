import React,{useEffect, useState} from 'react'
import { View,Text,StyleSheet,FlatList,Keyboard, RefreshControl } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, getAllChats } from '../components/redux/actions/chatActions';

const ChatBox = ({ route, navigation }) => {
    
    const receiver_id = route.params.id;
    
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getAllChats(authData.data.user_id,receiver_id));
    }, [dispatch])
    
    const chatMsgs = useSelector((state) => state.chats.data);
    // console.log(chatMsgs);
    const [message,Setmessage] = useState();
   
    const [referesing,setReferesing] = useState(false);
    const onReferesh = () => {
        setReferesing(true)
        dispatch(getAllChats(authData.data.user_id,receiver_id));
        setReferesing(false)
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
           title:route.params.full_name,
        });
    }, [navigation]);
        
    const pressHandler = () => {
        dispatch(sendMessage(authData.data.user_id,receiver_id,message));
        // dispatch(getAllChats(authData.data.user_id,receiver_id));
        Setmessage('');
        Keyboard.dismiss();
    }

    return (
        <View style={styles.Main}>
            <FlatList
                keyExtractor={(item) => item.chat_detail_id}
                data={chatMsgs}
                inverted={true}
                renderItem={({item}) => (
                    <View>
                        {
                            (item.user_id == authData.data.user_id && item.receiver_id == receiver_id) ? 
                            <Text style={styles.rightalign}><Text style={styles.innerText}>{item.message}</Text></Text> : 
                            (item.user_id == receiver_id && item.receiver_id == authData.data.user_id) ?
                            <Text  style={styles.leftalign}><Text style={styles.innerText}>{item.message}</Text></Text> : 
                            <Text></Text>
                        }
                    </View>
                )}
                refreshControl= {
                    <RefreshControl 
                      refreshing={referesing}
                      onRefresh={onReferesh}
                    />
                }
            />
            <TextInput
                onChangeText={(val) => Setmessage(val)}
                // onKeyPress={checkKeyPress}
                value={message}
                right={<TextInput.Icon name="send" onPress={pressHandler} disabled={false}/>} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Main:{
        flex:1,
        // marginVertical:20,
    },
    rightalign:{        
        padding:12,        
        margin:4,        
        backgroundColor:'#fd7e14cc',
        borderRadius:10,
        alignSelf:'flex-end',
    },
    leftalign:{
        padding:12,
        margin:4,        
        borderRadius:10,
        justifyContent:'flex-start',
        backgroundColor:'#4f4f4f',
        alignSelf:'flex-start',
    },
    innerText:{
        fontSize:16,
        color:'#fff',
    }
})

export default ChatBox
