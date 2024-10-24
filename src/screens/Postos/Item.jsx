import React from 'react';
import {TouchableHighlight, View, StyleSheet, Text, Image} from 'react-native';
import {COLORS} from '../../assets/colors';

const Item = ({item, onPress}) => {
  //console.log('item', item);
  return (
    <TouchableHighlight
      className="bg-slate-200 rounded-md h-28 mx-2 my-4 justify-between p-2"
      onPress={onPress}
      style={styles.shadow}>
      <>
        <Image source={{uri: item.bandImage}} className="absolute h-28 w-28 left-6 opacity-15" />
        <View className="w-2/3 justify-between h-full">
          <Text className="text-black font-semibold text-lg">{item.nome}</Text>
          <Text className="text-black text-2xl">
            R$ {item.precos.gasolinaComum}
          </Text>
        </View>
        <View></View>
      </>
    </TouchableHighlight>
  );
};

// <>
//   <Text style={styles.textName}>{item.nome}</Text>
//   <Text style={styles.textEmail}>{item.endereco}</Text>
// </>
export default Item;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
