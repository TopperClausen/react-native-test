import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Header from "../components/header";
import { getChatCollection, subscribe } from "../client/chat.client";
import globalStyle from "../globalStyle";
import { SvgUri } from "react-native-svg";
import { ChatDocument } from "../client/chat.types";
import { useSelector } from "react-redux";

const _ = require('lodash');

interface Props {
  navigation: any,
}

const HomeScreen = (props: Props) => {
  const state = useSelector((state: any) => state);
  const initialState: ChatDocument[] = [
    {} as ChatDocument,
    {} as ChatDocument,
    {} as ChatDocument,
  ];
  const [chats, setChats] = useState<ChatDocument[]>(initialState);

  getChatCollection().then(result => setChats(result as ChatDocument[]));

  return (
    <View>
      <Header title="Home" />
      <Text style={{ fontSize: 16 }}> Hej { state.session.displayName } </Text>
      <Text> vælg et rum og begynd at chatte </Text>
      { chats.length > 0 &&
        <Chats chats={chats} navigator={props.navigation} />
      } 
      { chats.length == 0 && 
        <Text> Loading... </Text>
      }
    </View>
  )
}

const Chats = (props: { chats: ChatDocument[], navigator: any }) => {
  return (
    <View style={style.container}>
      <Text style={globalStyle.header2}> Rum </Text>
      {props.chats.map(chat => (
        <Pressable onPress={() => props.navigator.navigate('Chat', { chatTitle: chat.title })} style={{ flexDirection: 'row', paddingLeft: 6, paddingRight: 6 }}>
          <SvgUri uri={chat.svgUrl} width={ 50 } height={ 50 } />
          <View>
            <Text style={style.chatTitle} key={chat.title}> { chat.title } </Text>
          </View>
        </Pressable>
      ))}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 30,
    flexDirection: 'column',
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 6,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    gap: 6
  },
  chatTitle: {
    fontSize: 16
  }
})

export default HomeScreen;
