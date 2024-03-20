import { StyleSheet, View, Text, Pressable } from "react-native"
import { useDispatch } from "react-redux";
import { clearSession } from "../store/session.store";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";

interface Props {
  title: string,
  svgUrl?: string,
  onBack?: () => void
}

const Header = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signOut = () => {
    dispatch(clearSession());
    navigation.navigate('Login');
  }

  return (
    <View style={style.header}>
      <View>
        {props.onBack &&
          <Pressable style={style.signOut} onPress={props.onBack}>
            <Text style={style.clickableText}> Tilbage </Text>
          </Pressable>
        }
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={style.text}> { props.title } </Text>
        {props.svgUrl &&
          <SvgUri uri={props.svgUrl} width={20} height={20} style={{ marginTop: 10, marginLeft: 2 }} />
        }
      </View>
      <View>
        <Pressable style={style.signOut} onPress={signOut}>
          <Text style={style.clickableText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    paddingTop: 12,
    height: 60,
    backgroundColor: 'white',
    shadowColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowRadius: 4,
    shadowOpacity: 0.6,
    marginBottom: 12
  },
  text: {
    fontSize: 24,
    marginTop: 6,
    fontWeight: 'bold'
  },
  signOut: {
    marginTop: 12
  },
  clickableText: {
    fontSize: 16,
    color: 'dodgerblue',
    textDecorationLine: 'underline'
  }
})

export default Header;
