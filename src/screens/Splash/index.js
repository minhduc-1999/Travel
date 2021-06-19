import React, {useState} from 'react';
import {ActivityIndicator, SafeAreaView, StatusBar} from 'react-native';

const Splash = props => {
  console.log('Splash screen render');
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar hidden />
      <ActivityIndicator color="#f15454" size={50} />
    </SafeAreaView>
  );
};
export default Splash;
