import React from 'react';
import {ScrollView, Text} from 'react-native';
import styles from './styles';
const ProfileScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Text>Profile Screen</Text>
    </ScrollView>
  );
};

export default ProfileScreen;
