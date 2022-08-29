import React,{ useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, FlatList, Pressable } from "react-native";
import { Card, IconButton, withTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getPollsList } from '../components/redux/actions/delegateActions';

const { width: ScreenWidth } = Dimensions.get("window");

const Polling = ({ navigation }) => {

    const dispatch = useDispatch();
    const pollslist = useSelector((state) => state.delegate.polls);  
   
    useEffect(() => {
        dispatch(getPollsList());        
        return () => {

        } 
    }, [dispatch])

    const pressHandler = (id) => {
      navigation.navigate('PollView', {
        poll_id: id
      });
    }

    return (
          <View style={{flex:1,marginVertical:20,marginHorizontal:10}}>
            <Text style={{fontSize:18,marginBottom:10}}>Select Poll to Vote</Text>
            <FlatList
              keyExtractor={(item) => item.id}
              data={pollslist}
              renderItem={({item}) => (
                  <Pressable  onPress={() => pressHandler(item.id)}>
                      <Text style={styles.title}>   
                        {item.title}
                      </Text>
                  </Pressable >
              )}
            ></FlatList>
            
          </View>
    )
}

const styles = StyleSheet.create({
  title : {
      marginVertical:6,
      fontSize: 18,
      borderStyle:'solid',
      borderColor:'#f1efea',
      borderWidth:2,
      padding:10,
      fontFamily:'VarelaRound-Regular',
      // width: ScreenWidth * 0.9,
      borderRadius:10
  }
})

export default withTheme(Polling)