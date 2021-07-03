import React from 'react';
import {View, Text, FlatList, SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';
import noti from '../../../assets/data/noti';
import NotificationItem from '../../components/NotificationItem';

const NotificationScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{paddingHorizontal: 20}}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View style={{paddingTop: StatusBar.currentHeight}}>
        <Text style={styles.title}>Thông báo</Text>
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
