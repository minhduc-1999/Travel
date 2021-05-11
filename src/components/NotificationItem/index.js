import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const NotificationItem = ({item}) => {
  function setColor(notiType) {
    if (notiType === 'wrench') {
      return '#778899';
    } else if (notiType === 'calendar-check-o') {
      return '#8a2be2';
    } else if (notiType === 'shield') {
      return '#00bfff';
    } else {
      return 'black';
    }
  }
  return (
    <View style={styles.container}>
      <View  style={[styles.iconCircle, {backgroundColor: setColor(item.type)}]}>
        <FontAwesome style={styles.icon} name={item.type} color='white'/>
      </View>
      <View style={styles.text}>
        <Text style={styles.content} numberOfLines={2}>{item.content}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  )
};

export default NotificationItem;