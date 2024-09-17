import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';

const MyButton = props => {
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor="#ffcc66"
      onPress={() => props.onClick()}>
      <Text className="text-2xl text-center text-white" style={styles.text}>
        {props.title}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 12,
    margin: 8,
    borderRadius: 10,
  },
  text: {
    color: COLORS.white,
    fontSize: 22,
  },
});

export default MyButton;

{
  /* <TouchableHighlight
      
      className="w-11/12 h-14 justify-center items-center bg-primary-900 p-3 m-2 rounded"
      onPress={() => props.onClick()}>
      <Text className="text-xl text-center text-white">
        {props.title}
      </Text>
    </TouchableHighlight> */
}
