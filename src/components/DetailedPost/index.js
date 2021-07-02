import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles.js';
import {windowHeight} from '../../Utils/Dimention';
import Swiper from '../Swiper';
import Divider from '../Divider';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
const DetailPost = ({post}) => {
  console.log('detail post component render');
  return (
    <View>
      <Swiper
        style={{width: '100%', height: (windowHeight * 60) / 100}}
        images={post.images}></Swiper>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{post.name}</Text>
        <View style={styles.addressContainer}>
          <FontAwesome name="map-pin" size={23} color="black" />
          <Text style={styles.address}>{post.address}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.priceContainer}>
          <FontAwesome name="ticket-alt" color="black" size={23} />
          <Text style={styles.price}>{post.price}</Text>
        </View>
        <View style={styles.openTimeContainer}>
          <FontAwesome name="door-open" color="black" size={22} />
          <Text style={styles.openTime}>{post.openTime}</Text>
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.descriptionTitle}>Giới thiệu</Text>
        <Text style={styles.description}>{post.description}</Text>
      </View>
    </View>
  );
};

export default DetailPost;
