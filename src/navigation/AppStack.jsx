import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Postos from '../screens/Postos';
import Users from '../screens/Users';
import Map from '../screens/Map';
import {COLORS} from '../assets/colors';
import LogoutButton from '../components/LogoutButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
export default function AppStack({navigation}) {
  const logOutUser = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthStack'}],
    });
  };

  return (
    <Tab.Navigator
      initialRouteName="Postos"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerRight: () => <LogoutButton logout={logOutUser} />,
      }}>
      <Tab.Screen
        name="Postos"
        component={Postos}
        options={{
          tabBarLabel: 'Postos',
          tabBarIcon: ({focused}) => (
            <Icon
              name="map-outline"
              color={focused ? COLORS.primary : COLORS.grey}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarLabel: 'Usuários',
          tabBarIcon: ({focused}) => (
            <Icon
              name="account-outline"
              color={focused ? COLORS.primary : COLORS.grey}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({focused}) => (
            <Icon
              name="map-marker-outline"
              color={focused ? COLORS.primary : COLORS.grey}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
