import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ForgotPass from './src/screens/ForgotPass';
import Preload from './src/screens/Preload';
import {StatusBar} from 'react-native';
import {COLORS} from './src/assets/colors';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primary} />
      <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
