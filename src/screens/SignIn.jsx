import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import MyButton from '../components/MyButton';
import {COLORS} from '../assets/colors';
// import app from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const recuperarSenha = () => {
    alert('Recuperar senha');
  };

  const entrar = () => {
    console.log(email, password);
    //alert('Entrar');
  };

  const cadastrar = () => {
    alert('Vai para Signup');
    //props.navigation.navigate('SignUp');
  };

  // resolver problema de teclado cobrindo input
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.keyboardFix}
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
          <Text style={styles.textForgotPass} onPress={recuperarSenha}>
            Esqueceu sua senha?
          </Text>
          <MyButton title="Entrar" onClick={entrar} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.divisionBar}>
            <View style={styles.bar}></View>
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.bar}></View>
          </View>
          <View style={styles.divCadastro}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text style={styles.textLink} onPress={cadastrar}>
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
  keyboardFix: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
