/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import Providers from './src/navigation/index';
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/CustomToast';
import 'react-native-gesture-handler';
const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Providers />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
