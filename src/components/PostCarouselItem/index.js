import React from 'react';
import {View, Text, Image, useWindowDimensions} from 'react-native';
import styles from './styles.js';
const Post = props => {
  const post = props.post;
  const width = useWindowDimensions().width;
  return (
    <View style={[styles.container, {width: width - 40}]}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/wallpaper.jpg')}
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
    </View>
  );
};

export default Post;
