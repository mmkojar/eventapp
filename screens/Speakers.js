import React,{ useEffect } from 'react'
import {  View,StyleSheet,FlatList } from 'react-native';
import { Card,Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getSpeakers } from '../components/redux/actions/delegateActions';

function Speakers() {

    const dispatch = useDispatch();
    const result = useSelector((state) => state.delegate);
    const { speaker } = result;

    useEffect(() => {  
        dispatch(getSpeakers());
    }, [dispatch])

    return (
        <View style={styles.container}>
            <FlatList
            data={speaker}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                    <Card elevation={1} style={styles.card} >
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content>
                            <Title style={{textAlign:'center'}}>{item.name}</Title>
                            <Title style={{textAlign:'center'}}>({item.company_name})</Title>
                        </Card.Content>
                        {/* <Card.Actions>
                            <Button>View</Button>
                        </Card.Actions> */}
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
})

export default Speakers
