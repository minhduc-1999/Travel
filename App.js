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
import PostComponent from './src/components/Post'

const App = () => {

  return (
    <>
    <StatusBar barStyle="dark-content"/>
    <SafeAreaView>
      {/* <HomeScreen /> */}
      <PostComponent />
    </SafeAreaView>
    </>
  );
};

export default App;
