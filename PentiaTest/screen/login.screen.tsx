import { View } from "react-native";
import GoogleLogin from "../components/googleLogin";
import FacebookLogin from "../components/facebookLogin";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { setSession } from "../store/session.store";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleGoogleLogin = (credentials: FirebaseAuthTypes.UserCredential) => {
    dispatch(setSession(credentials));
    navigation.navigate('Home');
  }

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <GoogleLogin onSuccess={credentials => handleGoogleLogin(credentials)} />
        <FacebookLogin />
      </View>
    </View>
  );
};

export default LoginScreen;

