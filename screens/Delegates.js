import React,{useEffect, useState} from 'react'
import {  View,StyleSheet,FlatList,Pressable,RefreshControl } from 'react-native';
import { Card,IconButton,withTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDelegates } from '../components/redux/actions/delegateActions';

const Delegates = ({ navigation,theme }) => {

    const dispatch = useDispatch();
    const delglist = useSelector((state) => state.delegate.delegates);
    const authData = useSelector((state) => state.auth);
    const [delegates, setDelegates] = useState([]);

    useEffect(() => {
        dispatch(getAllDelegates());
        setDelegates(delglist && delglist.filter((item) => item.id !== authData.data.user_id))
    }, [dispatch])
        
    
    const [referesing,setReferesing] = useState(false);
    const onReferesh = () => {
        setReferesing(true)
        dispatch(getAllDelegates());
        setReferesing(false)
    }

    const pressHandler = (item) => {
        navigation.navigate('AttendeeProfile', {
            id: item.id,
            full_name: item.first_name+' '+item.last_name,            
            city: item.city,
            user_image: item.user_image
        });
    }

    return (
        <View style={styles.Main}>
            <FlatList
            keyExtractor={(item) => item.id}            
            data={delegates && delegates}
            renderItem={({item}) => (
                <Pressable  onPress={() => pressHandler(item)}>
                    <Card style={styles.card} elevation={2}>
                        <Card.Title
                            title={item.first_name+' '+item.last_name}
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

export default withTheme(Delegates)
