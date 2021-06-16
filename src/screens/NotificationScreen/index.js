import React from 'react';
import {View, Text, FlatList, SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';
import noti from '../../../assets/data/noti';
import NotificationItem from '../../components/NotificationItem';

const NotificationScreen = ({navigation}) => {
  console.log('Noti screen render');
  return (
    <SafeAreaView style={{paddingTop: 20}}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={noti}
          renderItem={({item}) => <NotificationItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
