/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Providers from './src/navigation/index';
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/CustomToast';
import 'react-native-gesture-handler';
import RemotePushController from './src/Services/RemotePushController';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 250});
  }, []);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Providers />
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
      <RemotePushController />
    </>
  );
};

export default App;
