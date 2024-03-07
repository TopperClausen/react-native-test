import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Button, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";

const HomeScreen = () => {
  const state = useSelector((state: RootState) => state);
  const navigation = useNavigation();

  useEffect(() => {
    if (!state.session.uid) return navigation.navigate('Login');
  }, []);

  return (
    <View>
      <Header title="Home" />
      <Text style={{ fontSize: 16 }}> Hej { state.session.displayName } </Text>
      <Text> vælg et rum og begynd at chatte </Text>
    </View>
  )
}

export default HomeScreen;
