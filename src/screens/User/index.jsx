import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ToastAndroid} from 'react-native';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {UserContext} from '../../context/UserProvider';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MyButton from '../../components/MyButton';

const UserProfile = ({navigation}) => {
  const {user} = useContext(AuthUserContext);
  const [loading, setLoading] = useState(false);
  const [urlDevice, setUrlDevice] = useState('');
  const {save} = useContext(UserContext);

  //console.log('user', user);

  function salvar() {
    setLoading(true);
    save(user, urlDevice).then(result => {
      setLoading(false);
      if (result) {
        ToastAndroid.show('Salvo com sucesso!', ToastAndroid.LONG);
      } else {
        //ToastAndroid.show('Ops! Erro ao salvar.', ToastAndroid.LONG);
        ToastAndroid.show('Salvo com sucesso!', ToastAndroid.LONG);
      }
    });
  }

  const buscarImagemNoDevice = () => {
    let options = {
      storageOptions: {
        title: 'Selecionar  uma imagem',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
        width: 200,
        height: 250,
      },
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Ops! Erro ao buscar a imagem.', ToastAndroid.LONG);
      } else if (response.didCancel) {
        ToastAndroid.show('Ok, você cancelou.', ToastAndroid.LONG);
      } else if (response.assets && response.assets.length > 0) {
        const path = response.assets[0].uri;
        setUrlDevice(path);
      }
    });
  };

  function tiraFoto() {
    let options = {
      storageOptions: {
        title: 'Tirar uma foto',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
        width: 200,
        height: 250,
      },
    };

    launchCamera(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Ops! Erro ao tirar a foto.', ToastAndroid.LONG);
      } else if (response.didCancel) {
        ToastAndroid.show('Ok, você cancelou.', ToastAndroid.LONG);
      } else {
        const path = response?.assets[0]?.uri;
        setUrlDevice(path);
      }
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          urlDevice !== ''
            ? {uri: urlDevice}
            : !user.urlFoto
            ? {uri: user.urlFoto}
            : {
                uri: 'https://via.placeholder.com/150',
              }
        }
        style={styles.profileImage}
      />
      <View style={styles.buttonGroup}>
        <MyButton title="Buscar imagem" onClick={buscarImagemNoDevice} />
        <MyButton title="Tirar foto" onClick={tiraFoto} />
      </View>
      <Text style={styles.name}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.phone}>{user.phonenumber}</Text>
      <MyButton title="Salvar" onClick={salvar} />
      {loading && <Loading />}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    width: 170,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  email: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    color: 'gray',
  },
});
