import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import MyButton from '../components/MyButton';
import {COLORS} from '../assets/colors';
import auth from '@react-native-firebase/auth';

const ForgotPass = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recover = () => {
    if (email !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            'Email Enviado',
            'Verifique sua caixa de entrada no email: ' + email,
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.goBack();
                },
              },
            ],
          );
        })
        .catch(error => {
          console.log('ForgotPass: recover: ' + error);
          switch (error.code) {
            case 'auth/user-not-found':
              Alert.alert('Usuário Não Encontrado', 'Usuário não cadastrado');
              break;
            default:
              Alert.alert('Erro', 'Erro ao recuperar senha, tente novamente');
              break;
          }
        });
    } else {
      Alert.alert('Campo Vazio', 'Preencha o campo de email');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
        placeholderTextColor="#000"
        autoCapitalize="none"
      />
      <MyButton title="Recuperar" onClick={recover} />
    </View>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingBottom: 1,
  },
});
