import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Header,
  FlatList,
  Alert,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../assets/colors';
import firestore from '@react-native-firebase/firestore';
import MyButton from '../../components/MyButton';

const Posto = ({route, navigation}) => {
  const {item} = route.params;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (route.params.create) {
      return;
    }
    setName(item.nome);
    setAddress(item.endereco);
  }, []);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const handleUpdate = async () => {
    if (name === '' || address === '') {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    await firestore()
      .collection('postos')
      .doc(item.id)
      .update({
        nome: name,
        endereco: address,
      })
      // .set(
      //   {
      //     nome: name,
      //     endereco: address,
      //   },
      //   {merge: true},
      // )
      .then(() => {
        setName('');
        setAddress('');
        showToast('Posto atualizado com sucesso');
        navigation.goBack();
      })
      .catch(e => {
        console.log('Posto, handleUpdate:' + e);
        Alert.alert('Erro', 'Erro ao atualizar o posto');
      });
  };

  const handleDelete = () => {
    Alert.alert('Excluir', 'Deseja excluir o posto?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deletePosto();
        },
      },
    ]);
  };

  const deletePosto = async () => {
    await firestore()
      .collection('postos')
      .doc(item.id)
      .delete()
      .then(() => {
        showToast('Posto excluído com sucesso');
        navigation.goBack();
      })
      .catch(e => {
        console.log('Posto, handleDelete:' + e);
        Alert.alert('Erro', 'Erro ao excluir o posto');
      });
  };

  const handleCreate = async () => {
    console.log('name', name);
    console.log('address', address);
    if (name === '' || address === '') {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    await firestore()
      .collection('postos')
      .add({
        nome: name,
        endereco: address,
      })
      .then(() => {
        setName('');
        setAddress('');
        showToast('Posto criado com sucesso');
        navigation.goBack();
      })
      .catch(e => {
        console.log('Posto, handleCreate:' + e);
        Alert.alert('Erro', 'Erro ao criar o posto');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Postos</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nome do posto"
        keyboardType="default"
        returnKeyType="next"
        value={name}
        onChangeText={t => setName(t)}
        placeholderTextColor="#000"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        keyboardType="address"
        returnKeyType="next"
        value={address}
        onChangeText={t => setAddress(t)}
        placeholderTextColor="#000"
        autoCapitalize="none"
      />
      {route.params.create ? (
        <MyButton title="Criar" onClick={handleCreate} />
      ) : (
        <>
          <MyButton title="Salvar" onClick={handleUpdate} />
          <MyButton title="Excluir" onClick={handleDelete} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Posto;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginLeft: 10,
    color: COLORS.black,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primaryDark,
    position: 'absolute',
    top: 0,
  },
  input: {
    width: '90%',
    height: 50,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingBottom: 1,
    color: COLORS.black,
    marginBottom: 10,
  },
});
