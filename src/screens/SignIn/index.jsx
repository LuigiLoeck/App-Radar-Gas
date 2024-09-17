import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Button,
} from 'react-native';
import {AuthUserContext} from '../../context/AuthUserProvider';
import MyButton from '../../components/MyButton';
import {COLORS} from '../../assets/colors';
import Loading from '../../components/Loading';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '705920042148-j6s85bp9257rj1nqa8k5pms9qng20tmp.apps.googleusercontent.com',
});

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {signIn, googleSignIn} = useContext(AuthUserContext);

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
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //console.log(userInfo);
      if (await googleSignIn(userInfo)) {
        navigation.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        });
      } else {
        Alert.alert('Erro', 'Erro ao realizar login com Google');
      }
    } catch (error) {
      // if (isErrorWithCode(error)) {
      //   switch (error.code) {
      //     case statusCodes.SIGN_IN_CANCELLED:
      //       // user cancelled the login flow
      //       break;
      //     case statusCodes.IN_PROGRESS:
      //       // operation (eg. sign in) already in progress
      //       break;
      //     case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
      //       // play services not available or outdated
      //       break;
      //     default:
      //     // some other error happened
      //   }
      // } else {
      //   // an error that's not related to google sign in occurred
      // }
      console.log('error', error);
    }
  };
  // importar os icones
  return (
    <View style={{flex: 1}}>
      <View className="absolute top-0 left-0 bottom-0 right-0">
        <Image
          source={require('../../assets/images/MapExample.png')}
          resizeMode="contain"
          className="absolute self-center h-2/3"
        />
        <View className="flex-1">
          <LinearGradient
            colors={['#f0f0f080', '#f0f0f0']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.3}}
            className="flex-1"
          />
        </View>
      </View>
      <SafeAreaView className="absolute mt-48 w-full justify-center px-9">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1, gap: 10}}>
          <Text className="text-5xl text-black mb-5">Login</Text>
          <View className="gap-6">
            <View className="flex flex-row border border-primary-800 rounded-xl items-center px-4 py-1">
              <TextInput
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email"
                onChangeText={t => setEmail(t)}
                onSubmitEditing={() => this.passTextInput.focus()}
                blurOnSubmit={false}
                placeholderTextColor="#0008"
                autoCapitalize="none"
                className="flex-1 text-black text-lg"
              />
              <Icon name="email-outline" size={26} color="#888" />
            </View>
            <View className="flex flex-row border border-primary-800 rounded-xl items-center px-4 py-1">
              <TextInput
                ref={input => {
                  this.passTextInput = input;
                }}
                secureTextEntry={!passwordVisible}
                placeholder="Senha"
                keyboardType="default"
                returnKeyType="go"
                onChangeText={t => setPassword(t)}
                placeholderTextColor="#0008"
                autoCapitalize="none"
                className="flex-1 text-black text-lg"
              />
              <Icon
                name={!passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={26}
                color="#888"
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            </View>
            <Text className="text-primary-900 text-lg self-end">
              Esqueci a senha
            </Text>
          </View>
          <View className="items-center gap-4 mt-4">
            <MyButton title="Entrar" onClick={handleSignIn} />
            <View className="flex-row justify-between items-center gap-4">
              <View className="h-[1px] w-40 bg-black" />
              <Text className="text-black text-xl">OU</Text>
              <View className="h-[1px] w-40 bg-black" />
            </View>
            {/* <View onPress={handleGoogleSignIn}>
              <Image
                source={require('../../assets/images/googleLogo.png')}
                resizeMode="contain"
                className="size-12"
              />
              <Text className="text-black">Entrar com Google</Text>
            </View> */}
            <MyButton title="Logar com o google" onClick={handleGoogleSignIn} />
          </View>
          <Text className="text-black self-center text-2xl mt-20">
            Não tem uma conta?
            <Text
              className="text-primary-600"
              onPress={() => navigateToPage('SignUp')}>
              {' '}
              Cadastre-se
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
      {loading && <Loading />}
    </View>
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

{
  /* <SafeAreaView style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.divSuperior}>
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
      </SafeAreaView> */
}
