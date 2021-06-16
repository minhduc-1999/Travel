import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles.js';
import {windowHeight} from '../../Utils/Dimention';
import Swiper from 'react-native-swiper';
import Divider from '../Divider';
const DetailPost = ({post}) => {
  const renderPagination = (index, total, context) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: (windowHeight * 60) / 100 - 50,
          right: 15,
          backgroundColor: 'rgba(0, 0, 0, 0.74)',
          borderRadius: 8,
          paddingVertical: 5,
          paddingHorizontal: 15,
        }}>
        <Text style={{color: '#fff', fontSize: 16}}>
          {index + 1}/{total}
        </Text>
      </View>
    );
  };
  console.log('detail post component render');
  return (
    <View>
      <Swiper
        width={'100%'}
        loop={false}
        renderPagination={renderPagination}
        height={(windowHeight * 60) / 100}>
        {post.images.map(imageUrl => (
          <Image
            key={imageUrl}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              resizeMode: 'cover',
            }}
            source={{uri: imageUrl}}
          />
        ))}
      </Swiper>
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
