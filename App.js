/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import HomeScreen from './src/screens/Home';
import SearchResultScreen from './src/screens/SearchResults';
const App = () => {
  return (
    <>
    <StatusBar barStyle="dark-content"/>
    <SafeAreaView>
      {/* <HomeScreen /> */}
      <SearchResultScreen />
    </SafeAreaView>
    </>
  );
};

export default App;
