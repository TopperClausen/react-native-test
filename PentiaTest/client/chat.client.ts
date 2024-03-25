import firestore from '@react-native-firebase/firestore';
import { ChatDocument, ChatNotification, ChatUserData, Notification } from './chat.types';

export const getChatCollection = async () => {
  const snapshot = await firestore().collection('chat').get()
  return snapshot.docs.map(doc => { 
    return doc.data()
  });
};

export const getChatDocument = async (doc: string) => {
  const snapshot = await firestore().collection('chat').doc(doc).get();
  return snapshot.data() as ChatDocument;
}

export const subscribe = async (doc: string, success: any, onError: any) => {
  return firestore().collection('chat').doc(doc).onSnapshot(success, onError)
}

export const subscribeNotification = async (onSuccess: (_data: ChatNotification[]) => void, onError: any) => {
  return subscribe('Notifications', (data: { _data: Notification }) => {
    onSuccess(data._data.notifications);
  }, onError);
}

export const getNotifications = async () => {
  const snapshot = await firestore().collection('chat').doc('notification').get();
  return snapshot.data() as Notification;
}

export const userNotificationSeen = async (userId: string) => {
  const data = await getNotifications();
  data.notifications.filter(notification => notification.userId === userId).forEach(notification => {
    notification.seenAt = new Date();
    firestore().collection('chat').doc('notifications').update(notification);
  });
  return firestore().collection('chat').doc('notifications').update(data);

}

export const sendMessage = async (message: string, doc: string, user: ChatUserData) => {
  const data = await getChatDocument(doc);
  if (data === undefined) throw new Error('Document not found');
  console.log(data)

  data.messages.push({
    message,
    sentAt: new Date(),
    user
  });
  await firestore().collection('chat').doc(doc).update(data);

  const destinctUserIds = data.messages.map(message => {
    return message.user.uid;
  }).filter((uid, index, self) => self.indexOf(uid) === index);

  destinctUserIds.forEach(async uid => {
    const notifications = await getNotifications();
    notifications.notifications.push({
      userId: uid,
      title: 'New message',
      body: message,
      seenAt: null
    });
    await firestore().collection('chat').doc('notifications').update(notifications);
  })
};