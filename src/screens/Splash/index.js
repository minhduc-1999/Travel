import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, View, Image} from 'react-native';
import {windowWidth} from '../../Utils/Dimention';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const Splash = props => {
  const rotation = useSharedValue(0);
  const zoom = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [{rotateZ: `${rotation.value}deg`}],
      transform: [{scale: zoom.value}],
    };
  });
  useEffect(() => {
    // rotation.value = withSequence(
    //   withTiming(-5, {duration: 1000}),
    //   withRepeat(withTiming(5, {duration: 1000}), -1, true),
    //   withTiming(0, {duration: 1000}),
    // );
    // zoom.value = withTiming(
    //   20,
    //   {duration: 1500, easing: Easing.bezier(0.32, 0, 0.67, 0)},
    //   isFinish => {
    //     console.log(isFinish);
    //   },
    // );
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          {
            backgroundColor: '#fff',
            height: windowWidth * 0.35,
            width: windowWidth * 0.35,
            borderRadius: (windowWidth / 2) * 0.35,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
          animatedStyle,
        ]}>
        <Animated.Image
          width={windowWidth * 0.18}
          height={windowWidth * 0.18}
          source={require('../../../assets/images/Travelad.png')}
        />
      </Animated.View>
    </SafeAreaView>
  );
};
export default Splash;
