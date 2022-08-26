import React,{useEffect, useState} from 'react'
// import { WebView } from 'react-native-webview';
import {  View,StyleSheet,FlatList } from 'react-native';
import { Card,Title,Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutEvent } from '../components/redux/actions/delegateActions';

const Event_overview = () => {

    const dispatch = useDispatch();

    useEffect(() => {  
        dispatch(getAboutEvent());
    }, [dispatch])
    
    const [about,setAbout] = useState();
    const result = useSelector((state) => state.delegate.about);
    useEffect(() => {          
        setAbout(result);
    }, [])
    
    return (
        <View style={styles.container}>
            <FlatList
            keyExtractor={(item) => item.about_id}            
            data={about}
            renderItem={({item}) => (
                <Card elevation={2} style={{margin:5}}>
                   <Card.Content>
                        <Title style={styles.heading}>{item.about_heading}</Title>
                        <Paragraph style={styles.para}>{item.about_msg}</Paragraph>
                    </Card.Content>
                </Card>
            )}
            />
        </View>
    //    <WebView source={{ uri: 'http://vsss2.info2ideas.com/event-overview' }} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginVertical:10,
    },
    heading :{
        textAlign:'center',
        marginBottom:5,
        fontSize:28
    },
    para: {
        paddingVertical:20,
        fontSize:24,
        lineHeight:28,
        textAlign:'justify',
    }
})

export default Event_overview
