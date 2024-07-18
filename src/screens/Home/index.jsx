import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Header, FlatList, Alert} from 'react-native';
import LogoutButton from '../../components/LogoutButton';
import {CommonActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../assets/colors';
import Item from './Item';
import firestore from '@react-native-firebase/firestore';
import MyButton from '../../components/MyButton';
import {create} from 'react-test-renderer';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);

  const getData = () => {
    const unsubscribe = firestore()
      .collection('postos')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            const posto = {
              id: doc.id,
              ...doc.data(),
            };
            d.push(posto);
          });
          setData(d);
        },
        err => {
          console.log('Home, getData:' + err);
        },
      );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getData();

    return () => {
      unsubscribe();
    };
  }, []);

  const logOutUser = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      }),
    );
  };

  const routeUser = item => {
    console.log('item', item);
    navigation.navigate('Posto', {item});
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeUser(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Home</Text>
        <LogoutButton logout={logOutUser} />
      </View>
      <FlatList
        data={data}
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
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginLeft: 10,
    color: COLORS.black,
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
