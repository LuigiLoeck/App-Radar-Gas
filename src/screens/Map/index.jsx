import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Callout, Marker} from 'react-native-maps';
import {PostoContext} from '../../context/PostoProvider';

import {COLORS} from '../../assets/colors';
import {color} from '@rneui/base';

const Map = ({navigation}) => {
  const {postos} = useContext(PostoContext);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: -31.76275,
          longitude: -52.33001,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {postos.map(posto => (
          <Marker
            key={posto.id}
            coordinate={{
              latitude: posto.cordY,
              longitude: posto.cordX,
            }}
            title={posto.nome}
            description={posto.endereco}>
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{posto.bandeira}</Text>
                <Text style={styles.calloutDesc}>{posto.endereco}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
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
  callout: {
    width: 150,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    color: '#000',
  },
  calloutDesc: {color: '#555'},
});
