import React, {useState, useContext} from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import MyButton from '../../components/MyButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../assets/colors';
import {AuthUserContext} from '../../context/AuthUserProvider';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const {signUp} = useContext(AuthUserContext);

  const handleSignUp = async () => {
    if (!username || !email || !phonenumber || !password) {
      Alert.alert('Preencha todos os campos', 'Preencha todos os campos');
      return;
    }
    let user = {username, email, phonenumber};
    msgError = await signUp(user, password);
    if (msgError === 'ok') {
      console.log('Email de verificação enviado');
      Alert.alert(
        'Cadastro Realizado',
        'Foi enviado um email de verificação para ' + email + '.',
      );
      navigation.goBack();
    } else {
      Alert.alert('Erro', msgError);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          style={styles.input}
          placeholder="Nome de Usuário"
          keyboardType="default"
          returnKeyType="next"
          value={username}
          onChangeText={t => setUsername(t)}
          onSubmitEditing={() => this.emailTextInput.focus()}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          ref={input => {
            this.emailTextInput = input;
          }}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="next"
          value={email}
          onChangeText={t => setEmail(t)}
          onEndEditing={() => this.phoneTextInput.focus()}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          ref={input => {
            this.phoneTextInput = input;
          }}
          placeholder="Telefone"
          keyboardType="phone-pad"
          returnKeyType="next"
          value={phonenumber}
          onChangeText={t => setPhonenumber(t)}
          onSubmitEditing={() => this.passTextInput.focus()}
          placeholderTextColor="#000"
        />
        <TextInput
          style={styles.input}
          ref={input => {
            this.passTextInput = input;
          }}
          placeholder="Senha"
          keyboardType="default"
          returnKeyType="go"
          value={password}
          onChangeText={t => setPassword(t)}
          secureTextEntry
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <MyButton title="Cadastrar" onClick={handleSignUp} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    color: COLORS.black,
  },
});

export default SignUpScreen;
