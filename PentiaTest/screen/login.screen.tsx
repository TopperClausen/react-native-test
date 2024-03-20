import { StyleSheet, Text, View } from "react-native";
import GoogleLogin from "../components/googleLogin";
import FacebookLogin from "../components/facebookLogin";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { setSession } from "../store/session.store";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface Props {
  navigation: any
}

const LoginScreen = (props: Props) => {
  const dispatch = useDispatch();

  const handleGoogleLogin = (credentials: FirebaseAuthTypes.UserCredential) => {
    dispatch(setSession(credentials));
    props.navigation.navigate('Home');
  }

  return (
    <View style={style.container}>
      <Text style={style.text}>Login</Text>
      <GoogleLogin onSuccess={credentials => handleGoogleLogin(credentials)} />
      <FacebookLogin />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20
  }
});

export default LoginScreen;

