import EncryptedStorage from 'react-native-encrypted-storage';
import React from 'react';
import {TouchableHighlight, StyleSheet, Image} from 'react-native';
import auth from '@react-native-firebase/auth';

const LogoutButton = props => {
  const signOut = () => {
    EncryptedStorage.removeItem('user')
      .then(() => {
        auth()
          .signOut()
          .then(() => {
            props.logout();
          })
          .catch(error => {
            console.error('LogoutButton, signout auth:', error);
          });
      })
      .catch(error => {
        console.error('LogoutButton, signout remove item:', error);
      });
  };
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={signOut}
      underlayColor="transparent">
      <Image
        source={require('../assets/images/logout.png')}
        style={styles.image}
        accessibilityLabel="botão sair"
      />
    </TouchableHighlight>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 35,
    height: 35,
  },
});
