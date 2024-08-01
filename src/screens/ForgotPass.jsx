import React, {useState, useContext} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import MyButton from '../components/MyButton';
import {COLORS} from '../assets/colors';
import {AuthUserContext} from '../context/AuthUserProvider';

const ForgotPass = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {forgotPass} = useContext(AuthUserContext);

  const recover = async () => {
    let msgError = '';
    if (email !== '') {
      msgError = await forgotPass(email);
      if (msgError === 'ok') {
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
      } else {
        Alert.alert('Erro', msgError);
      }
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
    color: COLORS.black,
  },
});
