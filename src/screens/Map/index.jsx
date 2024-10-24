import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {PostoContext} from '../../context/PostoProvider';
import {AuthUserContext} from '../../context/AuthUserProvider';
import Loading from '../../components/Loading';
import {COLORS} from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Map = ({navigation}) => {
  const {postos, imagesLoaded} = useContext(PostoContext);
  const {user} = useContext(AuthUserContext);

  if (!imagesLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View></View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: user.location ? user.location.latitude : -31.76275,
          longitude: user.location ? user.location.longitude : -52.33001,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {user.location && (
          <Marker
            coordinate={{
              latitude: user.location.latitude,
              longitude: user.location.longitude,
            }}
            tracksViewChanges={false}
            anchor={{x: 0.5, y: 0.5}}>
            <View className="h-32 w-32 justify-center items-center">
              <View className="rounded-full h-16 w-16 bg-primary-600 opacity-20 absolute" />
              <Icon
                name="location-arrow"
                color={COLORS.primary}
                size={30}
                style={{
                  transform: [{rotate: `${user.location.bearing}deg`}],
                  rigth: 2,
                  top: 2,
                }}
              />
            </View>
          </Marker>
        )}
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
                  source={{uri: posto.bandImage}}
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
