import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles, {cmtStyle} from './styles.js';
import {windowHeight} from '../../Utils/Dimention';
import Swiper from '../Swiper';
import Divider from '../Divider';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {windowWidth} from '../../Utils/Dimention';
import {Avatar, Rating} from 'react-native-elements';
const DetailPost = ({post}) => {
  console.log('detail post component render');
  return (
    <View style={{backgroundColor: '#fff'}}>
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
        <Divider style={styles.divider} />
        <Pressable onPress={() => console.warn('go to comment')}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.descriptionTitle}>
                {'Đánh giá & nhận xét'}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {'Xem tất cả  '}
                <FontAwesome
                  name={'chevron-right'}
                  size={18}
                  color={'silver'}
                />
              </Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{marginRight: 10, fontSize: 16, color: 'silver'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#000',
                  }}>
                  3.3
                </Text>
                /5
              </Text>
              <Rating
                imageSize={16}
                ratingColor="#f15454"
                readonly
                fractions={1}
                startingValue={3.3}
                type="custom"
              />
            </View>
          </View>
          {[1, 2, 3].map(item => (
            <CommentItem key={item} />
          ))}
        </Pressable>
      </View>
    </View>
  );
};

const CommentItem = () => {
  return (
    <View style={cmtStyle.container}>
      <View style={cmtStyle.header}>
        <Avatar
          rounded
          size="medium"
          source={require('../../../assets/images/anonymous.png')}
        />
        <View style={cmtStyle.info}>
          <Text
            numberOfLines={1}
            style={{
              color: '#000',
              fontSize: 16,
              fontWeight: 'normal',
              maxWidth: windowWidth * 0.4,
              lineHeight: 26,
            }}>
            Name here f jalkfj dlajk fdal fkdlskl
          </Text>
          <Rating
            imageSize={16}
            ratingColor="#f15454"
            tintColor="#fff"
            ratingBackgroundColor="#fff"
            readonly
            ratingCount={4}
            startingValue={4}
            type="custom"
          />
        </View>
      </View>
      <View>
        <Text numberOfLines={3} style={{lineHeight: 22, fontSize: 16}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
      </View>
    </View>
  );
};

export default DetailPost;
