import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WishlistScreen from '../screens/WishlistScreen';
import WishlistDetail from '../screens/WishlistDetail';

const Stack = createStackNavigator();

const SavedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'SavedList'}
        component={WishlistScreen}
        options={{title: 'Wishlists'}}
      />
      <Stack.Screen
        name={'SavedDetail'}
        component={WishlistDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SavedNavigator;
