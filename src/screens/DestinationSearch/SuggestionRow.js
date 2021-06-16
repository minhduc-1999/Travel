import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

export default function SuggestionRow(props) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('HomeTabnavigator', {
          screen: 'Explore',
          params: {
            screen: 'SearchResults',
          },
        })
      }
      style={styles.row}>
      <View style={styles.iconContainer}>
        <Entypo name={'location-pin'} size={25} />
      </View>
      <Text style={styles.locationText}>{props.item.description}</Text>
    </Pressable>
  );
}
