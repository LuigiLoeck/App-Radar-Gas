import React, {useContext} from 'react';
import {TouchableHighlight, StyleSheet, Image} from 'react-native';
import {AuthUserContext} from '../context/AuthUserProvider';

const LogoutButton = props => {
  const {signOut} = useContext(AuthUserContext);
  const handleSignOut = async () => {
    try {
      await signOut();
      props.logout();
    } catch (error) {
      console.log('LogoutButton, handleSignOut  error:', error);
    }
  };
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={handleSignOut}
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
