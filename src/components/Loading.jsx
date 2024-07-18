import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS} from '../assets/colors';

export default () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="extralarge" color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0005',
  },
});
