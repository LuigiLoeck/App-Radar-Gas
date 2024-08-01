import React, {useState, useContext} from 'react';
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
import {AuthUserContext} from '../context/AuthUserProvider';
import MyButton from '../components/MyButton';
import {COLORS} from '../assets/colors';
import Loading from '../components/Loading';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {signIn} = useContext(AuthUserContext);

  const navigateToPage = page => {
    navigation.navigate(page);
  };

  const handleSignIn = async () => {
    let msgError = '';
    if (email && password) {
      setLoading(true);
      msgError = await signIn(email, password);
      if (msgError === 'ok') {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        });
      } else {
        setLoading(false);
        Alert.alert('Erro', msgError);
      }
    } else {
      Alert.alert('Campos Vazios', 'Preencha todos os campos');
    }
  };

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
            onSubmitEditing={() => this.passTextInput.focus()}
            blurOnSubmit={false}
            placeholderTextColor="#000"
            autoCapitalize="none"
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
            placeholderTextColor="#000"
            autoCapitalize="none"
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
      {loading && <Loading />}
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
    color: COLORS.black,
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
