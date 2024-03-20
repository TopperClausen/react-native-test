/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/login.screen';
import { Provider } from 'react-redux';
import store from './store/store';
import HomeScreen from './screen/home.screen';
import { View } from 'react-native';
import SplashScreen from './screen/splash.screen';
import ChatScreen from './screen/chat.screen';


function App(): React.JSX.Element {
  const [splashVisible, setSplashVisible] = useState(true);
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      {!splashVisible && 
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen}  />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      }
      {splashVisible && (
        <SplashScreen
          onDone={() => setSplashVisible(false)}
        />
      )}
    </Provider>
  );
}

export default App;
