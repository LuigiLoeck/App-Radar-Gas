import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Postos from '../screens/Postos';
import User from '../screens/User';
import Map from '../screens/Map';
import {COLORS} from '../assets/colors';
import LogoutButton from '../components/LogoutButton';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
export default function AppStack({navigation}) {
  const logOutUser = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthStack'}],
    });
  };

  const getTabBarStyle = routeName => {
    if (routeName === 'Postos' || routeName === 'User') {
      return {
        backgroundColor: '#fff',
        position: 'absolute',
        height: 56,
        bottom: 0,
        width: '85%',
        left: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: COLORS.grey,
        elevation: 5,
      };
    } else {
      return {
        backgroundColor: '#fff',
        height: 60,
        bottom: 25,
        width: '85%',
        borderRadius: 30,
        position: 'absolute',
        left: 30,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      };
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: getTabBarStyle(route.name),
      })}>
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({focused}) => (
            <IconFeather
              name="map"
              color={focused ? COLORS.primary : COLORS.grey}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Postos"
        component={Postos}
        options={{
          tabBarIcon: ({focused}) => (
            <IconEntypo
              name="list"
              color={focused ? COLORS.primary : COLORS.grey}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({focused}) => (
            <IconFeather
              name="user"
              color={focused ? COLORS.primary : COLORS.grey}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
