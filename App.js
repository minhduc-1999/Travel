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
import 'react-native-gesture-handler';
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Providers />
    </>
  );
};

export default App;
