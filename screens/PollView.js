import React,{ useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getPollView, updatePolls } from '../components/redux/actions/delegateActions';
import axios from 'axios';
import Config from '../components/utils/Config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PollView = ({ route }) => {

    const dispatch = useDispatch();
     
    const authData = useSelector((state) => state.auth);
    const [choiceById, setChoiceById] = useState('');
    const pollview = useSelector((state) => state.delegate.poll);

    useEffect(() => {
        dispatch(getPollView(route.params.poll_id));
        checkVote(route.params.poll_id);
                 
        return () => {
        } 
    }, [dispatch])    
        
    const handlePollSubmit = (res) => {
      console.log("submit:",res)
      dispatch(updatePolls(res.pid,res.paid,authData.data.user_id));
      checkVote(route.params.poll_id);
    }  

    const checkVote = (pid) => {
      
      const formdata = new FormData();
      formdata.append('pid',pid)
      formdata.append('user_id',authData.data.user_id)
      console.log(pid);
      axios.post(Config.api_url+'polling/checkUserVote', formdata ,{
          headers: { 
              "Access-Control-Allow-Origin": "*",
              'encryptedd':'api-token'
          }
      })
      .then((res) => {          
          console.log("cvote:",res.data);
          if(res.data && res.data.status === 'true') {
            setChoiceById(res.data.data.poll_answer_id);
          }
          else {
            setChoiceById('');
          }
      })
      .catch((err) => {
          alert(err);
      });
    }        
    
    return (
        <View style={{flex:1, marginVertical:20,marginHorizontal:10}}>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 20,
              fontFamily: "VarelaRound-Regular",
            }}
          >
            {pollview && pollview[0].title}
          </Text>
          <View>                
             <FlatList
              keyExtractor={(item) => item.paid}            
              data={pollview && pollview}
              renderItem={({item}) => (
                <View>
                  <Text>{item.choice} ({item.votes})</Text>
                  <Pressable onPress={() => handlePollSubmit(item)} disabled={(choiceById && choiceById) ? true : false}>
                  {
                    (item.votes > 0) ?
                    <View style={[styles.resultbar]}>
                        <Text style={[styles.percent,{width:`${Math.round((item.votes/item.total_votes)*100)}%`}]}>
                          {`${Math.round((item.votes/item.total_votes)*100)}%`}
                          {
                              (choiceById === item.paid) ? 
                              <FontAwesome5
                                name="check-circle"
                                size={16}
                                color="#000"
                              />   
                              : null
                          }
                        </Text>
                    </View>
                    : <View style={[styles.resultbar]}>
                          
                        <Text style={[styles.percent,{width:`${Math.round((item.votes/item.total_votes)*100)}%`}]}>0%</Text>
                      </View>
                  }        
                  </Pressable>
                </View>
              )}
            ></FlatList>            
          </View>
        </View>
        
    )
}

const styles = StyleSheet.create({  
  resultbar:{
    marginVertical:8,
    height:45,
    borderColor:'#a1a1a1',
    borderWidth:2,
    borderRadius:8,
  },
  percent:{
    minWidth:'7%',    
    color:'#fff',
    fontSize:16, 
    lineHeight:45,
    backgroundColor:'#a1a1a1',
    textAlign:'center',
  }
})
export default PollView