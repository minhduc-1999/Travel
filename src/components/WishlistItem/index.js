import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import places from '../../../assets/data/feed';

const WishlistItem = ({item}) => {
  const imageArr = item.postIdArray.reduce((accum, curr) => {
    
  }, []);
  const post = item.postIdArray.map(item =>
    places.find(place => place.id === item)
  );
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('SavedDetail')}>
      <View style={styles.imageGroup}>
        <Image style={styles.mainImage} source={{uri: post.image}} />
        <Image style={styles.image1} source={{uri: post.image}} />
        <Image style={styles.image2} source={{uri: post.image}} />
      </View>

      <Text numberOfLines={2} style={styles.name}>
        {item.name}
      </Text>
    </Pressable>
  );
};

export default WishlistItem;
