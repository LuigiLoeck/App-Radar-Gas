import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {AuthUserContext} from '../context/AuthUserProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {COLORS} from '../assets/colors';
import {StatusBar} from 'react-native';

export default navigation = () => {
  const {user, setUser} = useContext(AuthUserContext);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authUser => {
      authUser ? setUser(authUser) : setUser(null);
    });
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primary} />

      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
