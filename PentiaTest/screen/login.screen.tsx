import { StyleSheet, Text, View } from "react-native";
import GoogleLogin from "../components/googleLogin";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { setSession } from "../store/session.store";
import { useState } from "react";

interface Props {
  navigation: any
}

const LoginScreen = (props: Props) => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleGoogleLogin = (credentials: FirebaseAuthTypes.UserCredential) => {
    dispatch(setSession(credentials));
    props.navigation.navigate('Home');
  }

  return (
    <View style={style.container}>
      <Text style={style.text}>Login</Text>
      <Text>{error}</Text>
      <GoogleLogin onSuccess={credentials => handleGoogleLogin(credentials)} onError={error => setError(error)} />
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

