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
        options={{
          title: 'Wishlists',
          headerStyle: {
            backgroundColor: '#f2f2f2',
            height: 80,
          },
          headerTitleStyle: {
            fontSize: 30,
          }
        }}
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
