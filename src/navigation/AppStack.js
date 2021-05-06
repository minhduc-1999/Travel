import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DestinationSearchScreen from '../screens/DestinationSearch';
import GuestsScreen from '../screens/Guests';
import HomeTabNavigator from '../navigation/HomeTabNavigator';
import DetailedPostScreen from '../screens/DetailedPostScreen';
const Stack = createStackNavigator();
const AppStack = props => {
  return (
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
      <Stack.Screen
        name={'Detailed Post'}
        component={DetailedPostScreen}
        options={{title: 'Accommodation'}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
