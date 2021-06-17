import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles.js';
import {windowHeight} from '../../Utils/Dimention';
import Swiper from '../Swiper';
import Divider from '../Divider';
const DetailPost = ({post}) => {
  console.log('detail post component render');
  return (
    <View>
      <Swiper
        style={{width: '100%', height: (windowHeight * 60) / 100}}
        images={post.images}></Swiper>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{post.name}</Text>
        <Text style={styles.address}>{post.address}</Text>
        <Divider style={styles.divider} />
        <Text style={styles.price}>Giá vé: {post.price}</Text>
        <Text style={styles.openTime}>Giờ mở cửa: {post.openTime}</Text>
        <Divider style={styles.divider} />
        <Text style={styles.description}>{post.description}</Text>
      </View>
    </View>
  );
};

export default DetailPost;
