import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../assets/colors';
import MyButton from '../../components/MyButton';
import {PostoContext} from '../../context/PostoProvider';
import faker from 'faker';

const Posto = ({route, navigation}) => {
  const {item} = route.params;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [local, setLocal] = useState('');
  const [city, setCity] = useState('');
  const [flag, setFlag] = useState('');
  const [cep, setCep] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cordX, setCordX] = useState('');
  const [cordY, setCordY] = useState('');
  const [nota, setNota] = useState('');
  const [nmrNotas, setNmrNotas] = useState('');
  const [gasolinaComum, setGasolinaComum] = useState('');
  const [gasolinaAditivada, setGasolinaAditivada] = useState('');
  const [etanol, setEtanol] = useState('');
  const [diesel, setDiesel] = useState('');
  const {update, save, delposto} = useContext(PostoContext);

  useEffect(() => {
    if (route.params.create) {
      return;
    }
    setName(item.nome);
    setAddress(item.endereco);
    setLocal(item.bairro);
    setCity(item.cidade);
    setFlag(item.bandeira);
    setCep(item.cep);
    setCnpj(item.cnpj);
    setCordX(item.cordX);
    setCordY(item.cordY);
    setNota(item.nota);
    setNmrNotas(item.nmrNotas);
    setGasolinaComum(item.precos.gasolinaComum);
    setGasolinaAditivada(item.precos.gasolinaAditivada);
    setEtanol(item.precos.etanol);
    setDiesel(item.precos.diesel);
  }, []);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const handleUpdate = async () => {
    if (
      name === '' ||
      address === '' ||
      local === '' ||
      city === '' ||
      flag === '' ||
      cep === '' ||
      cnpj === '' ||
      cordX === '' ||
      cordY === '' ||
      nota === '' ||
      nmrNotas === '' ||
      gasolinaComum === '' ||
      gasolinaAditivada === '' ||
      etanol === '' ||
      diesel === ''
    ) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (
      await update({
        id: item.id,
        nome: name,
        endereco: address,
        bairro: local,
        cidade: city,
        bandeira: flag,
        cep: cep,
        cnpj: cnpj,
        cordX: cordX,
        cordY: cordY,
        nota: nota,
        nmrNotas: nmrNotas,
        precos: {
          gasolinaComum: gasolinaComum,
          gasolinaAditivada: gasolinaAditivada,
          etanol: etanol,
          diesel: diesel,
        },
      })
    ) {
      setName('');
      setAddress('');
      setLocal('');
      setCity('');
      setFlag('');
      setCep('');
      setCnpj('');
      setCordX('');
      setCordY('');
      setNota('');
      setNmrNotas('');
      setGasolinaComum('');
      setGasolinaAditivada('');
      setEtanol('');
      setDiesel('');
      showToast('Posto atualizado com sucesso');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Erro ao atualizar o posto');
    }
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
        onPress: async () => {
          if (await delposto(item)) {
            showToast('Posto excluído com sucesso');
            navigation.goBack();
          } else {
            Alert.alert('Erro', 'Erro ao excluir o posto');
          }
        },
      },
    ]);
  };

  const handleCreate = async () => {
    if (
      name === '' ||
      address === '' ||
      local === '' ||
      city === '' ||
      flag === '' ||
      cep === '' ||
      cnpj === '' ||
      cordX === '' ||
      cordY === '' ||
      nota === '' ||
      nmrNotas === '' ||
      gasolinaComum === '' ||
      gasolinaAditivada === '' ||
      etanol === '' ||
      diesel === ''
    ) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (
      await save({
        nome: name,
        endereco: address,
        bairro: local,
        cidade: city,
        bandeira: flag,
        cep: cep,
        cnpj: cnpj,
        cordX: cordX,
        cordY: cordY,
        nota: nota,
        nmrNotas: nmrNotas,
        precos: {
          gasolinaComum: gasolinaComum,
          gasolinaAditivada: gasolinaAditivada,
          etanol: etanol,
          diesel: diesel,
        },
      })
    ) {
      setName('');
      setAddress('');
      setLocal('');
      setCity('');
      setFlag('');
      setCep('');
      setCnpj('');
      setCordX('');
      setCordY('');
      setNota('');
      setNmrNotas('');
      setGasolinaComum('');
      setGasolinaAditivada('');
      setEtanol('');
      setDiesel('');
      showToast('Posto criado com sucesso');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Erro ao criar o posto');
    }
  };

  const handleGenerateRandomData = () => {
    setName(faker.company.companyName());
    setAddress(faker.address.streetAddress());
    setLocal(faker.address.city());
    setCity(faker.address.city());
    setFlag(faker.company.companyName());
    setCep(faker.address.zipCode());
    setCnpj(faker.datatype.number({ min: 10000000000000, max: 99999999999999 }).toString());
    setCordX(faker.address.longitude().toString());
    setCordY(faker.address.latitude().toString());
    setNota(faker.datatype.float({ min: 0, max: 5 }).toString());
    setNmrNotas(faker.datatype.number({ min: 0, max: 500 }).toString());
    setGasolinaComum(faker.datatype.float({ min: 4, max: 8 }).toString());
    setGasolinaAditivada(faker.datatype.float({ min: 4, max: 8 }).toString());
    setEtanol(faker.datatype.float({ min: 3, max: 7 }).toString());
    setDiesel(faker.datatype.float({ min: 3, max: 7 }).toString());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Postos</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          top: 50,
          width: 400,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          keyboardType="default"
          returnKeyType="next"
          value={local}
          onChangeText={t => setLocal(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          keyboardType="default"
          returnKeyType="next"
          value={city}
          onChangeText={t => setCity(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Cep"
          keyboardType="numeric"
          returnKeyType="next"
          value={cep}
          onChangeText={t => setCep(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Bandeira"
          keyboardType="default"
          returnKeyType="next"
          value={flag}
          onChangeText={t => setFlag(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="CNPJ"
          keyboardType="numeric"
          returnKeyType="next"
          value={cnpj}
          onChangeText={t => setCnpj(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          keyboardType="numeric"
          returnKeyType="next"
          value={cordY.toString()}
          onChangeText={t => setCordY(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          keyboardType="numeric"
          returnKeyType="next"
          value={cordX.toString()}
          onChangeText={t => setCordX(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Nota"
          keyboardType="numeric"
          returnKeyType="next"
          value={nota}
          onChangeText={t => setNota(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Número de Notas"
          keyboardType="numeric"
          returnKeyType="next"
          value={nmrNotas}
          onChangeText={t => setNmrNotas(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Gasolina Comum"
          keyboardType="numeric"
          returnKeyType="next"
          value={gasolinaComum}
          onChangeText={t => setGasolinaComum(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Gasolina Aditivada"
          keyboardType="numeric"
          returnKeyType="next"
          value={gasolinaAditivada}
          onChangeText={t => setGasolinaAditivada(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Etanol"
          keyboardType="numeric"
          returnKeyType="next"
          value={etanol}
          onChangeText={t => setEtanol(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Diesel"
          keyboardType="numeric"
          returnKeyType="next"
          value={diesel}
          onChangeText={t => setDiesel(t)}
          placeholderTextColor="#000"
          autoCapitalize="none"
        />
        <MyButton title="Gerar Dados Aleatórios" onClick={handleGenerateRandomData} />
        {route.params.create ? (
          <MyButton title="Criar" onClick={handleCreate} />
        ) : (
          <>
            <MyButton title="Salvar" onClick={handleUpdate} />
            <MyButton title="Excluir" onClick={handleDelete} />
          </>
        )}
      </ScrollView>
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
    width: '100%',
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
    zIndex: 1000,
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