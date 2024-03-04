import { Animated, Text, View } from "react-native";
import { useEffect, useState } from "react";
import BootSplash, { isVisible } from "react-native-bootsplash";

type Props = {
  onAnimationEnd: () => void;
};

const SplashScreen = (props: Props) => {
  const [opacity] = useState(() => new Animated.Value(1));

  const { container, logo /*, brand */ } = BootSplash.useHideAnimation({
    manifest: require("../assets/bootsplash_manifest.json"),

    logo: require("../assets/bootsplash_logo.png"),
    // darkLogo: require("../assets/bootsplash_dark_logo.png"),
    // brand: require("../assets/bootsplash_brand.png"),
    // darkBrand: require("../assets/bootsplash_dark_brand.png"),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      // Perform animations and call onAnimationEnd
      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 500,
      }).start(() => {
        props.onAnimationEnd();
      });
    },
  });
  return (
    <Animated.View>
      <View>
        <Text>Loading...</Text>
      </View>
      
    </Animated.View>
  );
};

export default SplashScreen;