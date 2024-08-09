import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Header, FlatList, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../assets/colors';
import Item from './Item';
import LogoutButton from '../../components/LogoutButton';
import MyButton from '../../components/MyButton';
import Loading from '../../components/Loading';
import {PostoContext} from '../../context/PostoProvider';

const Postos = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {postos} = useContext(PostoContext);

  // const logOutUser = () => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{name: 'AuthStack'}],
  //   });
  // };

  const routeUser = item => {
    console.log('item', item);
    navigation.navigate('Posto', {item});
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeUser(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.text}>Home</Text>
        <LogoutButton logout={logOutUser} />
      </View> */}
      <FlatList
        data={postos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatlist}
      />

      <MyButton
        title="Adicionar Posto"
        onClick={() =>
          navigation.navigate('Posto', {
            item: {
              name: '',
              address: '',
            },
            create: true,
          })
        }
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default Postos;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginLeft: 10,
    color: COLORS.white,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primaryDark,
  },
  flatlist: {
    width: '80%',
    marginTop: 20,
    maxHeight: '60%',
  },
});
