import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Header,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../assets/colors';
import Item from './Item';
import Loading from '../../components/Loading';
import {PostoContext} from '../../context/PostoProvider';
import Icon from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';

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
      <View className="absolute z-40 p-6 top-0 left-0 right-0 items-center justify-center">
        <View
          className="bg-white h-14 w-full rounded-full flex flex-row justify-center items-center py-2 px-6"
          style={styles.searchBox}>
          <Icon
            name="neuter"
            color={COLORS.black}
            size={26}
            style={{
              transform: [{rotate: '-45deg'}],
            }}
          />
          <TextInput
            returnKeyType="next"
            placeholder="Procure um posto..."
            placeholderTextColor="#0008"
            autoCapitalize="none"
            className="flex-1 text-black text-lg ml-2 h-16"
          />
        </View>
        <View className="h-12 w-full flex flex-row justify-between items-center">
          <View className="bg-primary-500 h-8 w-max rounded-full justify-between items-center px-4 flex-row gap-3">
            <Text className="text-black">Gasolina Comum | Shell</Text>
            <Icon name="chevron-down" color={COLORS.black} size={12} />
          </View>
          <View className="bg-white border h-8 border-black w-max px-5 justify-center items-center rounded-full">
            <Text className="text-black">Favoritos</Text>
          </View>
        </View>
        <View className="z-10 h-20 w-full">
          <LinearGradient
            colors={['#f0f0f000', '#f0f0f0']}
            start={{x: 0, y: 0.5}}
            end={{x: 0, y: 0}}
            className="flex-1"
          />
        </View>
      </View>
      <FlatList
        data={postos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        
        style={styles.flatlist}
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
    width: '100%',
    paddingHorizontal: 10,
    top: 120,
    maxHeight: '100%',
  },
});
