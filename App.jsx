import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {COLORS} from './src/assets/colors';

import Postos from './src/screens/Postos';
import Posto from './src/screens/Posto';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ForgotPass from './src/screens/ForgotPass';
import Preload from './src/screens/Preload';
import Users from './src/screens/Users';
import User from './src/screens/User';
import Bandeira from './src/screens/Bandeira';
import Bandeiras from './src/screens/Bandeiras';

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
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="Postos" component={Postos} />
        <Stack.Screen name="Posto" component={Posto} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Bandeira" component={Bandeira} />
        <Stack.Screen name="Bandeiras" component={Bandeiras} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
