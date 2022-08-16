import React,{ useEffect } from 'react'
import {  View,StyleSheet,FlatList,Text } from 'react-native';
import { Card,Paragraph,Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAgenda } from '../components/redux/actions/delegateActions';

function Agenda() {

    const dispatch = useDispatch();
    const result = useSelector((state) => state.delegate);
    const { agenda } = result;
    
    useEffect(() => {  
        dispatch(getAgenda());
    }, [dispatch])

    return (
        <View style={styles.container}>
                <FlatList
                data={agenda}
                numColumns={2}
                keyExtractor={(item) => item.agenda_id}
                renderItem={({item}) => (
                        <Card elevation={1} style={styles.card} >
                            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                            <Card.Content>
                                <View style={styles.leftView}>
                                    <Title>{item.agenda_name}</Title>
                                    <Paragraph>{item.speaker_name}</Paragraph>
                                </View>
                                <View style={styles.rightView}>
                                    <Paragraph>{item.agenda_date+' '+item.agenda_time}</Paragraph>                            
                                </View>
                            </Card.Content>
                        </Card>
                )}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginVertical:10,
    },
    card:{     
        flex:1,
        margin:3,
        borderWidth:2,
        borderColor:'#f1efea'
    },
    leftView: {
        alignContent:'flex-start'
    },
    rightView: {
        alignContent:'flex-end'
    }
})

export default Agenda
