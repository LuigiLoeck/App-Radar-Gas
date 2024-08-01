import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Preload from '../screens/Preload';
import Postos from '../screens/Postos';
import Posto from '../screens/Posto';
import Users from '../screens/Users';
import User from '../screens/User';
import Bandeira from '../screens/Bandeira';
import Bandeiras from '../screens/Bandeiras';

const Stack = createNativeStackNavigator();
export default AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Preload"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="Postos" component={Postos} />
      <Stack.Screen name="Posto" component={Posto} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Bandeira" component={Bandeira} />
      <Stack.Screen name="Bandeiras" component={Bandeiras} />
    </Stack.Navigator>
  );
};
