import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {COLORS} from '../../assets/colors';

const Map = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: -31.76275,
          longitude: -52.33001,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: -31.76275,
            longitude: -52.33001,
          }}
          title={'Localização'}
          description={'Descrição do local'}
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  map: {
    flex: 1,
  },
});
