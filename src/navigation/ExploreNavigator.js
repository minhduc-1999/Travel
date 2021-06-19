import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
// import SearchResultTabNavigator from '../navigation/SearchResultsTabNavigator';
import SearchResultMapScreen from '../screens/SearchResultMap';

const Stack = createStackNavigator();

const ExploreNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={'Welcome'}
        component={HomeScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name={'SearchResults'}
        component={SearchResultMapScreen}
        // options={{title: 'Search your destination'}}
      />
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
