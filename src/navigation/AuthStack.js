import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPassword';
const Stack = createStackNavigator();
const AuthStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Register'}
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'ForgotPassword'}
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
