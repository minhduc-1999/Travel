import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DestinationSearchScreen from '../screens/DestinationSearch';
import HomeTabNavigator from '../navigation/HomeTabNavigator';
import DetailedPostScreen from '../screens/DetailedPostScreen';
import ProfileScreen from '../screens/Profile';
import ChangePassword from '../screens/ChangePassword';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import DbProvider from '../Services/DbProvider';

const Stack = createStackNavigator();
const AppStack = props => {
  return (
    <DbProvider>
      <Stack.Navigator>
        <Stack.Screen
          name={'HomeTabnavigator'}
          component={HomeTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Destination Search'}
          component={DestinationSearchScreen}
          options={{
            title: 'Search your destination?',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={'Detailed Post'}
          component={DetailedPostScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Profile'}
          component={ProfileScreen}
          options={{title: 'Edit Profile', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name={'Change Password'}
          component={ChangePassword}
          options={{title: 'Change Password', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name={'Forgot Password'}
          component={ForgotPasswordScreen}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </DbProvider>
  );
};

export default AppStack;
