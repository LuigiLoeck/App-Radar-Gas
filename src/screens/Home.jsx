import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyButton from '../components/MyButton';

const Home = (props) => {
  const [contador, setContador] = useState(0);

  console.log(props);

  const contar = () => {
    setContador(contador + 1);
  };
  const reset = () => {
    setContador(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Text style={styles.text}>Contador: {contador}</Text>
      <MyButton title="Click Me" onClick={contar} />
      <MyButton title="Reset" onClick={reset}/>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});