import React from 'react';
import {View, Text, Image, useWindowDimensions, Pressable} from 'react-native';
import styles from './styles.js';
import {useNavigation} from '@react-navigation/native';

const Post = props => {
  const navigation = useNavigation();
  const post = props.post;
  const width = useWindowDimensions().width;
  return (
    <Pressable
      onPress={() => navigation.navigate('Detailed Post', {postId: post.id})}
      style={[styles.container, {width: width - 40}]}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={{uri: post.image}}
        />
        <View style={styles.detailContainer}>
          <Text style={styles.bedrooms}>
            {post.bed} bedroome - {post.bedroom} bathroom
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {post.type}. {post.title}
          </Text>
          <Text style={styles.prices}>
            <Text style={styles.newPrice}>${post.newPrice}</Text>/ night
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Post;
