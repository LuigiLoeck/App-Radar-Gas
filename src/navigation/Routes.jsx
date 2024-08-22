import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {AuthUserContext} from '../context/AuthUserProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import Posto from '../screens/Posto';
import User from '../screens/User';
import {COLORS} from '../assets/colors';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primary} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={AppStack} name="AppStack" />
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={Posto} name="Posto" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
