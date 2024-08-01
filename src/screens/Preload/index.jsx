import React, {useEffect, useContext} from 'react';
import {View, Image} from 'react-native';
import {COLORS} from '../../assets/colors';
import {AuthUserContext} from '../../context/AuthUserProvider';

export default function Preload({navigation}) {
  const {getUserCache, signIn} = useContext(AuthUserContext);

  const loginUser = async () => {
    const user = await getUserCache();

    if (user && (await signIn(user.email, user.password)) === 'ok') {
      navigation.reset({
        index: 0,
        routes: [{name: 'AppStack'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    }
  };

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}>
      <Image
        source={require('../../assets/images/RadarGasLogo.png')}
        style={{width: 150, height: 150}}
      />
    </View>
  );
}
