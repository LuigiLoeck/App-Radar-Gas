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
import {fakerPT_BR as faker} from '@faker-js/faker';

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

  const setsArray = [
    setName,
    setAddress,
    setLocal,
    setCity,
    setFlag,
    setCep,
    setCnpj,
    setCordX,
    setCordY,
    setNota,
    setNmrNotas,
    setGasolinaComum,
    setGasolinaAditivada,
    setEtanol,
    setDiesel,
  ];

  const getsArray = [
    name,
    address,
    local,
    city,
    flag,
    cep,
    cnpj,
    cordX,
    cordY,
    nota,
    nmrNotas,
    gasolinaComum,
    gasolinaAditivada,
    etanol,
    diesel,
  ];

  useEffect(() => {
    if (route.params.create) {
      return;
    }
    setsArray.forEach((set, index) => {
      set(item[Object.keys(item)[index]]);
    });
  }, []);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const handleUpdate = async () => {
    let empty = false;
    getsArray.forEach(item => {
      if (item === '') {
        empty = true;
      }
    });
    if (empty) {
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
        cep: Number(cep),
        cnpj: Number(cnpj),
        cordX: Number(cordX),
        cordY: Number(cordY),
        nota: Number(nota),
        nmrNotas: Number(nmrNotas),
        precos: {
          gasolinaComum: Number(gasolinaComum),
          gasolinaAditivada: Number(gasolinaAditivada),
          etanol: Number(etanol),
          diesel: Number(diesel),
        },
      })
    ) {
      setsArray.forEach(set => {
        set('');
      });
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
    let empty = false;
    getsArray.forEach(item => {
      if (item === '') {
        empty = true;
      }
    });
    if (empty) {
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
        cep: Number(cep),
        cnpj: Number(cnpj),
        cordX: Number(cordX),
        cordY: Number(cordY),
        nota: Number(nota),
        nmrNotas: Number(nmrNotas),
        precos: {
          gasolinaComum: Number(gasolinaComum),
          gasolinaAditivada: Number(gasolinaAditivada),
          etanol: Number(etanol),
          diesel: Number(diesel),
        },
      })
    ) {
      setsArray.forEach(set => {
        set('');
      });
      showToast('Posto criado com sucesso');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Erro ao criar o posto');
    }
  };
  const bandeiras = [
    'Azeredo',
    'Coqueiro',
    'Ipiranga',
    'Petrobras',
    'Rodoil',
    'Shell',
    'Sim',
    'BandeiraBranca',
  ];
  const handleGenerateRandomData = () => {
    let fakeCoords = faker.location.nearbyGPSCoordinate({
      origin: [-31.76275, -52.33001],
      radius: 20,
      isMetric: true,
    });
    setName(faker.company.name());
    setAddress(faker.location.secondaryAddress());
    setLocal(faker.location.county());
    setCity(faker.location.city());
    setFlag(bandeiras[Math.floor(Math.random() * bandeiras.length)]);
    setCep(faker.location.zipCode('########'));
    setCnpj(
      faker.number
        .bigInt({min: 10000000000000, max: 99999999999999})
        .toString(),
    );
    setCordX(fakeCoords[0].toString());
    setCordY(fakeCoords[1].toString());
    setNota(faker.number.float({min: 3, max: 5, fractionDigits: 1}).toString());
    setNmrNotas(faker.number.bigInt({min: 10, max: 500}).toString());
    setGasolinaComum(
      faker.number.float({min: 4, max: 6, fractionDigits: 3}).toString(),
    );
    setGasolinaAditivada(
      faker.number.float({min: 6, max: 8, fractionDigits: 3}).toString(),
    );
    setEtanol(
      faker.number.float({min: 4, max: 6, fractionDigits: 3}).toString(),
    );
    setDiesel(
      faker.number.float({min: 3, max: 5, fractionDigits: 3}).toString(),
    );
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
          paddingBottom: 50,
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
        {route.params.create ? (
          <>
            <MyButton
              title="Gerar Dados Aleatórios"
              onClick={handleGenerateRandomData}
            />
            <MyButton title="Criar" onClick={handleCreate} />
          </>
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
