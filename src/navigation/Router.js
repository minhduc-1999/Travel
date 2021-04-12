import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DestinationSearchScreen from '../screens/DestinationSearch';
import SearchResult from '../screens/SearchResults';
import GuestsScreen from '../screens/Guests';
import HomeTabNavigator from '../navigation/HomeTabNavigator';
import SearchResultScreen from '../screens/SearchResults';
const Stack = createStackNavigator();
const Router = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'HomeTabnavigator'}
          component={HomeTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'GuestsScreen'}
          component={GuestsScreen}
          options={{title: 'How many people?'}}
        />
        <Stack.Screen
          name={'Destination Search'}
          component={DestinationSearchScreen}
          options={{title: 'Search your destination?'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
