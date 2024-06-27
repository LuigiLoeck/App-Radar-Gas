import React from 'react';
import {View, Text} from 'react-native';

// import { Container } from './styles';

const SignIn = (props) => {
  return (
    <View>
      <Text onPress={() => props.navigation.navigate('Home')}>SignIn</Text>
      <Text onPress={() => props.navigation.navigate('SignUp')}>SignIn</Text>
    </View>
  );
};

export default SignIn;
