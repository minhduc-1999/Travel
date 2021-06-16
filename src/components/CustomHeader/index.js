import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

const index = props => {
  const {headerBg} = props;
  console.log('Custom Header render');
  return (
    <View style={[styles.container, props.style]}>
      <View style={[styles.header, {backgroundColor: headerBg}]}>
        <View style={[styles.section]}>{props.left}</View>
        <View style={[styles.section, {flex: 3, justifyContent: 'center'}]}>
          {props.middle}
        </View>
        <View style={[styles.section]}>{props.right}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    width: '100%',
    height: 70,
    alignItems: 'center',
    zIndex: 100,
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  section: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default index;
