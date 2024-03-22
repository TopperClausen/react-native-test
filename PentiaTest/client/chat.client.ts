import firestore from '@react-native-firebase/firestore';
import { ChatDocument, ChatUserData } from './chat.types';

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

export const sendMessage = async (message: string, doc: string, user: ChatUserData) => {
  const data = await getChatDocument(doc);
  if (data === undefined) throw new Error('Document not found');
  console.log(data)

  data.messages.push({
    message,
    sentAt: new Date(),
    user
  });
  return firestore().collection('chat').doc(doc).update(data);
};