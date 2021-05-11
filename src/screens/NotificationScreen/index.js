import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import noti from '../../../assets/data/noti';
import NotificationItem from '../../components/NotificationItem';

const NotificationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={noti}
        renderItem={({item}) => <NotificationItem item={item} />}
      />
    </View>
  );
};

export default NotificationScreen;
