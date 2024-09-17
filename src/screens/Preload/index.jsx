import React, {useEffect, useContext} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import {AuthUserContext} from '../../context/AuthUserProvider';
import MyButton from '../../components/MyButton';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

export default function Preload({navigation}) {
  const {getUserCache, signIn} = useContext(AuthUserContext);

  const loginUser = async () => {
    const user = await getUserCache();

    if (user && (await signIn(user.email, user.password)) === 'ok') {
      navigation.reset({
        index: 0,
        routes: [{name: 'AppStack'}],
      });
    }
  };

  const handleClick = page => {
    navigation.navigate(page);
  };

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-1">
        <Image
          source={require('../../assets/images/MapExample.png')}
          resizeMode="contain"
          className="absolute self-center h-2/3"
        />
        <View className="flex-1">
          <LinearGradient
            colors={['#f0f0f040', '#f0f0f0']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.5}}
            className="flex-1"
          />
        </View>
      </View>
      <View className="absolute top-1/2 w-full justify-center items-center gap-10">
        <Text className="text-6xl text-black">
          Radar<Text className=" text-primary-600">Gas</Text>
        </Text>
        <Text className="text-2xl text-black w-64 text-center">
          Abasteça inteligente, economize sempre.
        </Text>
        <MyButton title="Login" onClick={() => handleClick('SignIn')} />
        <Text className="text-xl text-black w-64 text-center my-2">
          Não tem uma conta?{' '}
          <Text
            className="text-primary-500"
            onPress={() => handleClick('SignUp')}>
            Cadastre-se
          </Text>
        </Text>
      </View>
    </View>
  );
}
