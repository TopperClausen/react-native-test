import { View, Text, StyleSheet, Image } from "react-native"

interface Props {
  message: string,
  sentByName: string,
  sentAt: Date,
  imageUrl: string,
  showName: boolean,
  position: 'left' | 'right'
}

const ChatItem = (props: Props) => {
  return (
    <View style={{ ...style.container, ...(props.position === 'left' ? style.contentLeft : style.contentRight) }}>
      <View>
        { props.showName && 
          <View style={style.container}>
            <Text style={{ fontSize: 8 }}>{props.sentByName}</Text>
            <Image source={{ uri: props.imageUrl }} />
          </View>
        }
        <View style={{ ...style.message, ...(props.position === 'left' ? style.messageWhite : style.messageBlue) }}>
          <Text style={{ ...style.messageText, ...(props.position === 'left' ? {} : style.messageWhiteText) }}>{props.message}</Text>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  messageWhite: {
    backgroundColor: 'white'
  },
  messageBlue: {
    backgroundColor: 'dodgerblue'
  },
  message: {
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 4,
    borderRadius: 12
  },
  messageText: {
    fontSize: 16
  },
  messageWhiteText: {
    color: 'white'
  },
  container: {
    flexDirection: 'row',
  },
  contentLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  contentRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

export default ChatItem;