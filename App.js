import React,{Fragment,useEffect} from 'react';
import { configureFonts, DefaultTheme ,Provider as PaperProvider,withTheme } from 'react-native-paper';
import Nav from './components/Nav';
import Spinner from './components/utils/Spinner';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification'
import { navigationRef,navigate } from './services/RootNavigation';
// import { onOpenNotification, createLocalNotification } from './services/NotificationService';
import { localNotificationService } from './services/LocalNotificationService';
import { fcmService } from './services/FCMService';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'VarelaRound-Regular',
      fontWeight: 'normal',
    }
  },
  ios: {
    regular: {
      fontFamily: 'VarelaRound-Regular',
      fontWeight: 'normal',
    }
  },
  android: {
    regular: {
      fontFamily: 'VarelaRound-Regular',
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
    fcmService.registerAppWithFCM();
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

  const onOpenNotification = async (notify) => {
    // check for auth    
    if(notify.data.type=="message") {
      if(notify.userInteraction == true) {
        navigate('ChatBox', {
          id: notify.data.sender_id,
          full_name: notify.data.sender_name,
        });
      }
      
    }
  }

  /* const createLocalNotification = () => {
    
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
    });
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      
      PushNotification.cancelAllLocalNotifications();
      
      // console.log("remoteMessage:",JSON.stringify(remoteMessage));
      
      PushNotification.localNotification({
        channelId: "eventapp-id",
        title:remoteMessage.notification.title,
        message:remoteMessage.notification.body
      });
    });
    return unsubscribe;
  } */

  return (    
    <PaperProvider theme={theme}>
      <Fragment>
        <Nav color={theme.colors.primary} refer={navigationRef}/>
        <Spinner/>
      </Fragment>
    </PaperProvider>
  );
};


export default withTheme(App);
