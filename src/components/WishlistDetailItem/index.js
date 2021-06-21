import React from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import places from '../../../assets/data/feed';

const WishlistDetailItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Detailed Post', {postId: item.id})}
      style={styles.container}>
      <Image 
        style={styles.image}
        source={{uri: item.images[0]}}
      />
      <Text 
        style={styles.description}
        numberOfLines={2} >
        {item.title}
      </Text>
    </Pressable>
  )
}

export default WishlistDetailItem;
