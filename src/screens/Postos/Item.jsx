import React from 'react';
import {TouchableHighlight, View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../assets/colors';

const Item = ({item, onPress}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <>
        <Text style={styles.textName}>{item.nome}</Text>
        <Text style={styles.textEmail}>{item.endereco}</Text>
      </>
    </TouchableHighlight>
  );
};

export default Item;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  textName: {
    color: COLORS.white,
    fontSize: 16,
  },
  textEmail: {
    color: COLORS.white,
    fontSize: 14,
  },
});
