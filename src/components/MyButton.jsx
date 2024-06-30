import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';

const MyButton = props => {
  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.test,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: COLORS.white,
  },
});

export default MyButton;