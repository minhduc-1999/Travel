import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, View, Image} from 'react-native';
import {windowWidth} from '../../Utils/Dimention';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const Splash = props => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(220, {
        duration: 1500,
        easing: Easing.bezier(0.37, 0, 0.63, 1),
      }),
      -1,
      false,
    );
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
            height: windowWidth * 0.35,
            width: windowWidth * 0.35,
            borderRadius: (windowWidth / 2) * 0.35,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'absolute',
          },
        ]}>
        <Image
          width={windowWidth * 0.18}
          height={windowWidth * 0.18}
          source={require('../../../assets/images/lent.png')}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            height: windowWidth,
            width: windowWidth,
            borderRadius: (windowWidth / 2) * 0.35,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible',
            position: 'absolute',
          },
          animatedStyle,
        ]}>
        <Image
          width={windowWidth * 0.18}
          height={windowWidth * 0.18}
          source={require('../../../assets/images/sun.png')}
        />
      </Animated.View>
    </SafeAreaView>
  );
};
export default Splash;
