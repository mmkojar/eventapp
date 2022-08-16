import React,{ useEffect, useState } from 'react'
import { View, Text, Dimensions } from "react-native";
import RNPoll from "react-native-poll";
import RNAnimated from "react-native-animated-component";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: ScreenWidth } = Dimensions.get("window");

const Polling = () => {

    const dispatch = useDispatch();
    const result = useSelector((state) => state.delegate);

    const [choices, setChoices] = useState([])
    const [voted, setVoted] = useState('');

   
    useEffect(() => {
        setChoices(result.polls);
        getData();
        
        return () => {

        }
    }, [dispatch,getData])

    console.log("voted:", voted);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('choice')
            if(value !== null) {
                setVoted(value);
            }
          } catch(e) {
            console.log(e);
          }
    }

    const handlePollSubmit = async (res) => {
        // console.log(res.id);
       
        try {
            await AsyncStorage.setItem('choice',res.id);
          } catch (e) {
            // saving error
          }
    }

    return (
        <View style={{flex:1, marginHorizontal:10}}>
          <Text
            style={{
              marginTop: 32,
              fontSize: 20,
              fontFamily: "SuezOne-Regular",
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
            //   hasBeenVoted={voted !== null ? true : false}
            //   votedChoiceByID={voted}
              totalVotes={10}
              animationDuration={750}
              choices={choices}
              PollContainer={RNAnimated}
              PollItemContainer={RNAnimated}
              choiceTextStyle={{
                fontFamily: "SuezOne-Regular",
              }}
              onChoicePress={(selectedChoice) => 
                {
                    handlePollSubmit(selectedChoice);
                    console.log("SelectedChoice: ", selectedChoice)
                }
              }
            />
          </View>
        </View>
    )
}

export default Polling