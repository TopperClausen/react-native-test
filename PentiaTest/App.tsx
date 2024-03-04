/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/login.screen';
import { Provider } from 'react-redux';
import store from './store/store';
import HomeScreen from './screen/home.screen';
import { View } from 'react-native';
import SplashScreen from './screen/splash.screen';


function App(): React.JSX.Element {
  const [visible, setVisible] = useState(true);
  const Stack = createNativeStackNavigator();

  return (
    <View>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {visible && (
        <SplashScreen
          onAnimationEnd={() => {
            setVisible(false);
          }}
        />
      )}
    </View>
  );
}

export default App;
