import React from 'react'
import PushNotification from 'react-native-push-notification'

const Notifications = () => {

   React.useEffect(() => {
        getNotifications();
   },[]) 

   const getNotifications = ()  => {
        PushNotification.getDeliveredNotifications((message) => {
            console.log(message);
        });
   }

  return (
    // <div>Notifications</div>
    <></>
  )
}

export default Notifications