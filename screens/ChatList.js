import React,{useEffect, useState} from 'react'
import {  View,StyleSheet,FlatList,Pressable,RefreshControl } from 'react-native';
import { Card,IconButton,withTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getChatHistory } from '../components/redux/actions/chatActions';

const ChatList = ({ navigation,theme }) => {

    const dispatch = useDispatch();
    const chathistory = useSelector((state) => state.chats.chathistory);
    const authData = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getChatHistory(authData.data.user_id));
    }, [dispatch])
        
    
    const [referesing,setReferesing] = useState(false);
    const onReferesh = () => {
        setReferesing(true)
        dispatch(getChatHistory(authData.data.user_id));
        setReferesing(false)
    }

    const pressHandler = (item) => {
        navigation.navigate('ChatBox', {
            id: item.user2_id,
            full_name: item.user_name,
        });
    }

    return (
        <View style={styles.Main}>
            <FlatList
            keyExtractor={(item) => item.chat_detail_id}            
            data={chathistory}
            renderItem={({item}) => (
                <Pressable  onPress={() => pressHandler(item)}>
                    <Card style={styles.card} elevation={2}>
                        <Card.Title
                            title={item.user_name}
                            subtitle={item.city ? item.city : 'City'}
                            right={(props) => <IconButton {...props} icon="arrow-right" color={theme.colors.primary} onPress={() => pressHandler(item)} />}
                        />
                    </Card>
                </Pressable >
            )}
            refreshControl= {
                <RefreshControl 
                  refreshing={referesing}
                  onRefresh={onReferesh}
                />
            }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Main: {
        flex:1,
        marginBottom:5
    },
    card:{
        marginBottom:5,
    }
})

export default withTheme(ChatList)
