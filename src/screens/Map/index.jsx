import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
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

  const mapViewRef = useRef(null);

  return (
    <View style={styles.container}>
      <View className="absolute z-40 p-6 top-0 left-0 right-0 items-center justify-center">
        <View
          className="bg-white h-14 w-full rounded-full flex flex-row justify-center items-center py-2 px-6"
          style={styles.searchBox}>
          <Icon
            name="neuter"
            color={COLORS.black}
            size={26}
            style={{
              transform: [{rotate: '-45deg'}],
            }}
          />
          <TextInput
            returnKeyType="next"
            placeholder="Procure um posto..."
            placeholderTextColor="#0008"
            autoCapitalize="none"
            className="flex-1 text-black text-lg ml-2 h-16"
          />
        </View>
        <View className="h-12 w-full flex flex-row justify-between items-center">
          <View className="bg-primary-500 h-8 w-max rounded-full justify-between items-center px-4 flex-row gap-3">
            <Text className="text-black">Gasolina Comum | Shell</Text>
            <Icon name="chevron-down" color={COLORS.black} size={12} />
          </View>
          <View className="bg-white border h-8 border-black w-max px-5 justify-center items-center rounded-full">
            <Text className="text-black">Favoritos</Text>
          </View>
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapViewRef}
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
      <TouchableOpacity
        className="absolute bg-white right-7 bottom-28 h-14 w-14 rounded-full justify-center items-center"
        style={styles.searchBox}
        onPress={() =>
          mapViewRef.current.animateToRegion(
            {
              latitude: user.location.latitude,
              longitude: user.location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            },
            1000,
          )
        }>
        <Icon name="location-crosshairs" color={COLORS.primary} size={26} />
      </TouchableOpacity>
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
  searchBox: {
    shadowColor: '#000',
    elevation: 5,
  },
});
