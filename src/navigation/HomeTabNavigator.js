import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreNavigator from '../navigation/ExploreNavigator';
import HomeScreen from '../screens/Home';
import SavedNavigator from '../navigation/SavedNavigator';
import MenuScreen from '../screens/Menu';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const HomeTabNavigator = props => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#f15454',
      }}>
      <Tab.Screen
        name={'Explore'}
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({color}) => (
            // <Fontisto name="search" size={25} color={color} />
            <Material name="explore" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Saved'}
        component={SavedNavigator}
        options={{
          tabBarIcon: ({color}) => (
            // <FontAwesome name="heart-o" size={25} color={color} />
            <Material name="favorite" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Airbnb'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="airbnb" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Notifications'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Material name="notifications" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Menu'}
        component={MenuScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Material name="menu" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
