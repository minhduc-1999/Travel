import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {windowHeight} from '../../Utils/Dimention';
import Animated from 'react-native-reanimated';

const index = props => {
  const {bgAnimated, shadowAnim, style, height} = props;
  console.log('Custom Header render');
  return (
    <Animated.View style={[styles.container, height && {height}, shadowAnim]}>
      <Animated.View style={[styles.bg, style, bgAnimated]}></Animated.View>
      <View
        style={[
          styles.innerHeader,
          height && {height: height - StatusBar.currentHeight},
        ]}>
        {props.children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    width: '100%',
    height: windowHeight * 0.15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  innerHeader: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: '100%',
    height: windowHeight * 0.15 - StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'column',
  },
  bg: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default index;
