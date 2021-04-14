import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchResultScreen from '../screens/SearchResults';
import SearchResultMapScreen from '../screens/SearchResultMap';


export default function SearchResultsTabNavigator() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator tabBarOptions={{
        activeTintColor: '#f15454',
        indicatorStyle: {
            backgroundColor: '#f15454'
        }
    }}>
      <Tab.Screen name={'List'} component={SearchResultScreen} />
      <Tab.Screen name={'Map'} component={SearchResultMapScreen} />
    </Tab.Navigator>
  );
}
