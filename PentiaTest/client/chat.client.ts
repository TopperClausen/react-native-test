import firestore from '@react-native-firebase/firestore';

const chatCollection = firestore().collection('chat');

export const sendMessage = async (message: string, user: { uid: string, imageUrl: string, name: string}) => {
  await chatCollection.add({
    message,
    user
  });
};