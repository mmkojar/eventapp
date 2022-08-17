import React,{Fragment,useEffect} from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { configureFonts, DefaultTheme ,Provider as PaperProvider,withTheme } from 'react-native-paper';
import Nav from './components/Nav';
import Spinner from './components/utils/Spinner';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification'
import { navigationRef,navigate } from './services/RootNavigation';
// import { onOpenNotification, createLocalNotification } from './services/NotificationService';
import { localNotificationService } from './services/LocalNotificationService';
import { fcmService } from './services/FCMService';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

const fontConfig = {
  web: {
    regular: {
      fontFamily: Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular',
      fontWeight: 'normal',
    }
  },
  ios: {
    regular: {
      fontFamily: Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular',
      fontWeight: 'normal',
    }
  },
  android: {
    regular: {
      fontFamily: Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular',
      fontWeight: 'normal',
    }
  }
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#23CCEF',
    accent: '#f1efea',
  },
  fonts: configureFonts(fontConfig),
  
};

const App = () => {

  useEffect(() => {   
    // onOpenNotification();
    // createLocalNotification();
    // fcmService.registerAppWithFCM();
    fcmService.register(onRegister,onNotification,onOpenNotification)
    localNotificationService.configure(onOpenNotification);
    // console.log(localNotificationService.getAllChannels());
  }, []);

  const onRegister = (token) => {}

  const onNotification = (notify) => {
    const options = {
      soundName: 'default',
      playSound: true,
      priority:'high'
    }
    localNotificationService.showNotification(
      notify.title,
      notify.body,
      notify,
      options,
    )
  }
  
  const showIOSNotify = () => {
    localNotificationService.showNotification(
      'ios',
      'Test Notify From IOS',
      {
        type:'message',
        sender_id:'3',
        sender_name:'Mohamemd mac'
      },
      {},
    )    
  }

  const onOpenNotification = async (notify) => {
    // check for auth    
    console.log("notify:",notify);
    if(notify.data.type=="message") {
      if(notify.userInteraction == true) {
        navigate('ChatBox', {
          id: notify.data.sender_id,
          full_name: notify.data.sender_name,
        });
      }
      
    }
  }

  return (    
    <PaperProvider theme={theme}>
      <Fragment>
        <Nav color={theme.colors.primary} refer={navigationRef}/>
        
            <TouchableOpacity onPress={showIOSNotify}>
            <View>
              <Text style={{textAlign:'center',marginBottom:50}}>Click Me</Text>
            </View>        
            </TouchableOpacity>
        <Spinner/>
      </Fragment>
    </PaperProvider>
  );
};


export default withTheme(App);
