import React, {useEffect} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {COLORS} from '../../assets/colors';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Preload = ({navigation}) => {
  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Preload: erro em getUserCache', error);
    }
  };

  const loginUser = async () => {
    const user = await getUserCache();
    if (user) {
      auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        })
        .catch(error => {
          console.log('SignIn: login: ' + error);
          switch (error.code) {
            case 'auth/invalid-credential' ||
              'auth/invalid-email' ||
              'auth/invalid-password':
              Alert.alert('Tente Novamente', 'Email ou senha inválidos');
              break;
            case 'auth/user-disabled':
              Alert.alert(
                'Conta Desativada',
                'Usuário desativado, contate o suporte',
              );
              break;
            default:
              Alert.alert('Erro', 'Erro ao logar, tente novamente');
              break;
          }
        });
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
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
};

export default Preload;
