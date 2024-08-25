import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {PostoContext} from '../../context/PostoProvider';

import {COLORS} from '../../assets/colors';

const Map = ({navigation}) => {
  const {postos} = useContext(PostoContext);
  const bandeiras = {
    Azeredo: require('../../assets/images/Azeredo.png'),
    Coqueiro: require('../../assets/images/Coqueiro.png'),
    Ipiranga: require('../../assets/images/Ipiranga.png'),
    Petrobras: require('../../assets/images/Petrobras.png'),
    Rodoil: require('../../assets/images/Rodoil.png'),
    Shell: require('../../assets/images/Shell.png'),
    Sim: require('../../assets/images/Sim.png'),
    BandeiraBranca: require('../../assets/images/BandeiraBranca.png'),
  };

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
        {postos.map((posto, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: posto.cordY,
              longitude: posto.cordX,
            }}
            tracksViewChanges={false}
            title={posto.nome}
            description={posto.endereco}>
            <View style={styles.markerContainer}>
              <View style={styles.markerBox}>
                <Text style={styles.markerText}>
                  {posto.precos.gasolinaComum.toFixed(2)}
                </Text>
                <Image
                  source={
                    bandeiras[posto.bandeira]
                      ? bandeiras[posto.bandeira]
                      : bandeiras.BandeiraBranca
                  }
                  style={styles.markerImage}
                />
              </View>
              <View style={styles.markerTriangle} />
            </View>
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
  markerContainer: {
    alignItems: 'center',
  },
  markerBox: {
    height: 35,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  markerImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  markerText: {
    fontSize: 16,
    color: COLORS.black,
  },
  markerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.gray,
  },
});