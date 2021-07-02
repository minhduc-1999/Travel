import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreNavigator from '../navigation/ExploreNavigator';
// import HomeScreen from '../screens/Home';
import SavedNavigator from '../navigation/SavedNavigator';
import MenuScreen from '../screens/Menu';
import Notification from '../screens/NotificationScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Splash from '../screens/Splash'; //test

const Tab = createBottomTabNavigator();
const HomeTabNavigator = props => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#f15454',
      }}>
      <Tab.Screen
        name={'Khám phá'}
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="globe" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Yêu thích'}
        component={SavedNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="heart-o" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Chuyến đi'}
        component={Splash}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="paper-plane-o" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Hộp thư'}
        component={Notification}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="bell-o" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Tài khoản'}
        component={MenuScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="bars" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
