import React from 'react';
import {ActivityIndicator, View, Image} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export default ({page}) => {
  return (
    <>
      {page ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className="absolute top-0 left-0 right-0 bottom-0 flex-1 justify-center self-center bg-slate-100">
          <Image
            className="absolute top-32 self-center size-36"
            source={require('../assets/images/RadarGasLogo.png')}
            accessibilityLabel="logo da RadarGas"
          />
          <ActivityIndicator size={100} className="color-primary-900" />
        </Animated.View>
      ) : (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className="absolute top-0 left-0 right-0 bottom-0 flex-1 justify-center self-center bg-stone-950/45">
          <ActivityIndicator size={70} className="color-primary-500" />
        </Animated.View>
      )}
    </>
  );
};
