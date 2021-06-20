import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {windowHeight} from '../../Utils/Dimention';
import Animated from 'react-native-reanimated';

const index = props => {
  const {bgAnimated, shadowAnim} = props;
  console.log('Custom Header render');
  return (
    <Animated.View style={[styles.container, shadowAnim]}>
      <Animated.View style={[styles.bg, bgAnimated]}></Animated.View>
      <View style={styles.innerHeader}>{props.children}</View>
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
    height: (windowHeight * 150) / 1000,
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
    height: (windowHeight * 150) / 1000 - StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bg: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default index;
