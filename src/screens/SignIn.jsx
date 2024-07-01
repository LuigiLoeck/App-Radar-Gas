import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import MyButton from '../components/MyButton';
import {COLORS} from '../assets/colors';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToPage = page => {
    navigation.navigate(page);
  };

  const handleSignIn = () => {
    if (email !== '' && password !== '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          if (!auth().currentUser.emailVerified) {
            Alert.alert(
              'Email não verificado',
              'Verifique seu email para continuar',
            );
            return;
          }
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
      Alert.alert('Campos Vazios', 'Preencha todos os campos');
    }
  };

  // resolver problema de teclado cobrindo input
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../assets/images/RadarGasLogo.png')}
            accessibilityLabel="logo da RadarGas"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
            onEndEditing={() => this.passTextInput.focus()}
          />
          <TextInput
            ref={input => {
              this.passTextInput = input;
            }}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPassword(t)}
          />
          <Text
            style={styles.textForgotPass}
            onPress={() => navigateToPage('ForgotPass')}>
            Esqueceu sua senha?
          </Text>
          <MyButton title="Entrar" onClick={handleSignIn} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.divisionBar}>
            <View style={styles.bar}></View>
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.bar}></View>
          </View>
          <View style={styles.divCadastro}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text
              style={styles.textLink}
              onPress={() => navigateToPage('SignUp')}>
              Cadastre-se
            </Text>
          </View>
        </View>
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
  divSuperior: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  divInferior: {
    flex: 3,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
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
  textForgotPass: {
    color: COLORS.primaryDark,
    fontSize: 14,
    marginVertical: 10,
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
  divisionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  bar: {
    //flex: 1,
    height: 2,
    width: '30%',
    backgroundColor: COLORS.grey,
  },
  textOu: {
    marginHorizontal: 20,
    color: COLORS.grey,
    fontSize: 20,
  },
  divCadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textNormal: {
    color: COLORS.black,
    fontSize: 18,
  },
  textLink: {
    color: COLORS.primary,
    fontSize: 18,
    marginLeft: 5,
  },
});

export default SignIn;

{
  /* <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={{flex: 1}}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}>
</ScrollView>
      </KeyboardAvoidingView> */
}
