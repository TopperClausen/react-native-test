import { useEffect } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

interface Props {
  onDone: () => void;
}

const SplashScreen = (props: Props) => {
  useEffect(() => {
    setTimeout(() => {
      props.onDone();
    }, 1000);
  }, []);
  return (
    <View style={style.container}>
      <Image style={style.image} source={require('../assets/img/pentia.png')} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  image: {
    width: 300,
    height: 300,
  }
});


export default SplashScreen;