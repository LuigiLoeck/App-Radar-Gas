import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import MyButton from '../../components/MyButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../assets/colors';
import {CommonActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!username || !email || !phonenumber || !password) {
      Alert.alert('Preencha todos os campos', 'Preencha todos os campos');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = auth().currentUser;
        firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            username: username,
            email: email,
            phonenumber: phonenumber,
          })
          .then(() => {
            console.log('User added!');
            user
              .sendEmailVerification()
              .then(() => {
                console.log('Email de verificação enviado');
                Alert.alert(
                  'Cadastro Realizado',
                  'Foi enviado um email de verificação para ' + email + '.',
                );
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'SignIn'}],
                  }),
                );
              })
              .catch(error => {
                console.log('Erro ao enviar email de verificação: ' + error);
              });
          })
          .catch(error => {
            console.log('Erro ao adicionar usuário: ' + error);
          });
      })
      .catch(error => {
        console.log('SignUp: Cadastro:' + error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Email já cadastrado', 'Tente outro email');
            break;
          case 'auth/invalid-email':
            Alert.alert('Email inválido', 'Digite um email válido');
            break;
          case 'auth/weak-password':
            Alert.alert('Senha fraca', 'Digite uma senha mais grande');
            break;
          default:
            Alert.alert('Erro', 'Erro ao cadastrar, tente novamente');
            break;
        }
      });
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
  },
});

export default SignUpScreen;
