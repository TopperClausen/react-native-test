import { View, Text, ScrollView, StyleSheet } from "react-native"
import Header from "../components/header";
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { getChatDocument, sendMessage, subscribe } from "../client/chat.client";
import { useEffect, useRef, useState } from "react";
import Input from "../components/input";
import SvgButton from "../components/svgButton";
import Send from "../assets/img/send.svg";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ChatItem from "../components/chatItem";
import { ChatDocument } from "../client/chat.types";

interface RouteProps {
  chatTitle: string
}

interface Props {
  navigation: StackNavigationProp<ParamListBase, "Chat">,
  route: RouteProp<ParamListBase, "Chat"> & { params: RouteProps }
}

const ChatScreen = (props: Props) => {
  const { chatTitle } = props.route.params as any;
  const state = useSelector((state: RootState) => state);
  const [chat, setChat] = useState<ChatDocument | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrolltoButtom();
  }, [chat])

  const scrolltoButtom = () => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }

  const onUpdate = (data: any) => {
    if (chat === null && data?._data !== undefined) {
    }
    if ((chat?.messages?.length || 0) != data._data.messages.length) {
      setChat(data._data);
    }
  }
  
  subscribe(chatTitle, onUpdate, () => {});

  const submitChat = async () => {
    setMessage('');
    setLoading(true);
    await sendMessage(message, chatTitle, {
      uid: state.session.uid,
      displayName: state.session.displayName,
      imageUrl: state.session.photoURL
    });
    setLoading(false);
  }

  const [message, setMessage] = useState<string>("");
  
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Header title={chat?.title || 'Not Found'} svgUrl={chat?.svgUrl} onBack={() => props.navigation.navigate('Home')} />
      <View style={{flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', alignContent: 'space-between' }}>
        <ScrollView style={{ height: 0 }} ref={scrollRef}>
          {chat?.messages &&
            <View>
              {chat.messages.map((message, index) => {
                return <ChatItem 
                          message={message.message}
                          sentByName={message.user.displayName}
                          imageUrl={message.user.imageUrl}
                          sentAt={message.sentAt}
                          showName={message.user.uid !== state.session.uid}
                          position={message.user.uid === state.session.uid ? 'right' : 'left'}
                          key={index}
                        />
              })}
            </View>
          }
          <View style={{ height: 52 }}></View>
        </ScrollView>
        <View style={style.inputContainer}>
          {loading &&
            <View style={{ display: 'flex', height: 52, width: "100%",  alignItems: 'center', justifyContent: 'center' }}>
              <View>
                <Text>Sending message...</Text>
              </View>
            </View>
          }
          {!loading &&
            <View style={{ flexDirection: 'row', height: 52, width: '100%', justifyContent: 'center', padding: 6 }} >
              <Input value={message} placeholder="What's on your mind?" onChangeText={text => setMessage(text)} width={330} />
              <SvgButton svgComponent={Send} onPress={submitChat} />
            </View>
          }
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f2f2f2',
    width: '100%',
  }
})

export default ChatScreen;
