import React,{ useEffect, useState } from 'react'
import { View, Text, Dimensions } from "react-native";
import RNPoll from "react-native-poll";
import RNAnimated from "react-native-animated-component";
import { useDispatch, useSelector } from 'react-redux';
import { getPolls, updatePolls } from '../components/redux/actions/delegateActions';
import axios from 'axios';
import Config from '../components/utils/Config';

const { width: ScreenWidth } = Dimensions.get("window");

const PollView = () => {

    const dispatch = useDispatch();
    const pollslist = useSelector((state) => state.delegate.polls);  
    const authData = useSelector((state) => state.auth);
    const [totalVotes, setTotalVotes] = useState('');
    const [beenVoted, setBeenVoted] = useState('false');
    const [choiceById, setChoiceById] = useState('');
   
    useEffect(() => {
        setTotalVotes(pollslist.map((item) => item.votes).reduce((total,count)=>total+count,0)) 
        dispatch(getPolls());

        const formdata = new FormData();
        // formdata.append('pid','1')
        formdata.append('user_id',authData.data.user_id)
       
        axios.post(Config.api_url+'polling/checkUserVote', formdata ,{
          headers: { 
              "Access-Control-Allow-Origin": "*",
              'encryptedd':'api-token'
          }
        })
        .then((res) => {
            // console.log(res.data.data);
            if(res && res.data.status == 'true') {
              setBeenVoted('true');
              setChoiceById(parseInt(res.data.data.poll_answer_id));
            }
            else {
              setBeenVoted('false');
              setChoiceById('');
            }              
        })
        .catch((err) => {
            alert(err);
        });

        return () => {

        } 
    }, [dispatch,setBeenVoted,setChoiceById])

    console.log("choiid:",beenVoted);

    const handlePollSubmit = (res) => {
      console.log("POLL:", res);
      dispatch(updatePolls(res.poll_id,res.id,authData.data.user_id));
    }
    
    return (
        <View style={{flex:1, marginHorizontal:10}}>
          <Text
            style={{
              marginTop: 32,
              fontSize: 20,
              fontFamily: "FontAwesome",
            }}
          >
            What is your favorite sport brand?
          </Text>
          <View
            style={{
              width: ScreenWidth * 0.9,
            }}
           >
            <RNPoll
              appearFrom="top"
              totalVotes={totalVotes && totalVotes}
              choices={pollslist && pollslist}
              hasBeenVoted={beenVoted}
              votedChoiceByID={choiceById && choiceById}
              animationDuration={750}
              PollContainer={RNAnimated}
              PollItemContainer={RNAnimated}
              choiceTextStyle={{
                fontFamily: "FontAwesome",
              }}
              onChoicePress={(selectedChoice) => 
                {
                    handlePollSubmit(selectedChoice);
                }
              }
            />
          </View>
        </View>
    )
}

export default PollView