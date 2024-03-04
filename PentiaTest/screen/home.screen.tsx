import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const state = useSelector((state: RootState) => state);
  const navigation = useNavigation();

  useEffect(() => {
    if (!state.session.uid) return navigation.navigate('Login');
  }, [])

  return (
    <View>
      <Text>Home</Text>
      <Text> { state.session.email } </Text>
    </View>
  )
}

export default HomeScreen;
