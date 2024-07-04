import React, {useState} from 'react';
import {View, Text, StyleSheet, Header, FlatList} from 'react-native';
import LogoutButton from '../../components/LogoutButton';
import {CommonActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../assets/colors';
import Item from './Item';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Home = ({navigation}) => {
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
  };

  const renderItem = ({item}) => (
    <Item item={item.title} onPress={() => routeUser(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Home</Text>
        <LogoutButton logout={logOutUser} />
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatlist}
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
  },
  flatlist: {
    width: '80%',
    marginTop: 20,
  },
});
