import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';

const MyButton = props => {
  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
      <Text>{props.title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 10,
  },
});

export default MyButton;