import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import firestore from '@react-native-firebase/firestore';
import GetLocation from 'react-native-get-location';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const getUserLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
      console.log(location);
      return location;
    } catch (error) {
      console.log('AuthUserProvider, getUserLocation:', error);
      return null;
    }
  };

  const storeUserCache = async (email, password) => {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({email, password}),
      );
    } catch (error) {
      console.log('SignIn: erro em storeUserCache', error);
    }
  };

  const getUserCache = async () => {
    try {
      const jsonValue = await EncryptedStorage.getItem('user_session');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('AuthUserProvider, retrieveUserSession:', error);
    }
  };

  const signUp = async (user, password) => {
    try {
      await auth().createUserWithEmailAndPassword(user.email, password);
      await auth().currentUser.sendEmailVerification();
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set(user);
      return 'ok';
    } catch (error) {
      return launchServerMessageErro(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      if (!auth().currentUser.emailVerified) {
        return 'Email não validado, verifique seu email.';
      }
      await storeUserCache(email, password);
      if (await getUser(password)) {
        return 'ok';
      } else {
        return 'Erro ao buscar usuário. Contate o administrador.';
      }
    } catch (error) {
      return launchServerMessageErro(error);
    }
  };

  const googleSignIn = async userInfo => {
    try {
      console.log(userInfo);
      const googleCredentials = auth.GoogleAuthProvider.credential(
        userInfo.data.idToken,
      );
      console.log(googleCredentials);
      await auth().signInWithCredential(googleCredentials);
      if (await getGoogleUser(userInfo.data.user.email)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const forgotPass = async email => {
    try {
      await auth().sendPasswordResetEmail(email);
      return 'ok';
    } catch (error) {
      return launchServerMessageErro(error);
    }
  };

  const getUser = async password => {
    try {
      let doc = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();
      if (doc.exists) {
        doc.data().uid = auth().currentUser.uid;
        doc.data().password = password;
        if (!doc.data().urlFoto) {
          doc.data().urlFoto =
            'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';
        }
        doc.data().location = await getUserLocation();
        setUser(doc.data());
        return doc.data();
      }
    } catch (error) {
      return null;
    }
  };

  const getGoogleUser = async email => {
    console.log(email);
    try {
      let query = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();
      let doc = query.docs[0];
      console.log(doc);
      if (doc.exists) {
        doc.data().uid = auth().currentUser.uid;
        if (!doc.data().urlFoto) {
          doc.data().urlFoto =
            'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';
        }
        doc.data().location = await getUserLocation();
        setUser(doc.data());
        return doc.data();
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await EncryptedStorage.removeItem('user_session');
      if (auth().currentUser) {
        await auth().signOut();
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  function launchServerMessageErro(e) {
    switch (e.code) {
      case 'auth/invalid-credential':
      case 'auth/invalid-email':
      case 'auth/invalid-password':
        return 'Email ou senha inválidos.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/user-not-found':
        return 'Usuário não encontrado.';
      case 'auth/email-already-in-use':
        return 'Email já cadastrado.';
      case 'auth/weak-password':
        return 'Digite uma senha mais grande.';
      default:
        return 'Erro desconhecido. Contate o administrador';
    }
  }

  return (
    <AuthUserContext.Provider
      value={{
        user,
        setUser,
        signUp,
        signIn,
        signOut,
        forgotPass,
        getUserCache,
        googleSignIn,
      }}>
      {children}
    </AuthUserContext.Provider>
  );
};
