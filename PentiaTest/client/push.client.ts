import { PermissionsAndroid, Platform } from "react-native"
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee from "@notifee/react-native";


export const requestPermission = async () => {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  } else if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }

  await notifee.requestPermission();
}

export const createBackgroundListener = async () => {
  messaging().setBackgroundMessageHandler(async message => {
    await push(message.notification?.title || '', message.notification?.title || '');
  });
}

export const push = async (title: string, body: string) => {
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
  });

  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      pressAction: {
        id: "default"
      }
    },
  })
}

export const logToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log(fcmToken);
  } else {
    console.log('Token not found');
  }
}