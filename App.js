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
import feed from './assets/data/feed'
const App = () => {
  const post1 = feed[0];
  return (
    <>
    <StatusBar barStyle="dark-content"/>
    <SafeAreaView>
      {/* <HomeScreen /> */}
      <PostComponent post={post1}/>
    </SafeAreaView>
    </>
  );
};

export default App;
