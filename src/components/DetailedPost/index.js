import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles, {cmtStyle} from './styles.js';
import {windowHeight} from '../../Utils/Dimention';
import Swiper from '../Swiper';
import Divider from '../Divider';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {windowWidth} from '../../Utils/Dimention';
import {Avatar, AirbnbRating} from 'react-native-elements';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {DbContext} from '../../Services/DbProvider';

const DetailPost = ({post, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [star, setStar] = useState(3);
  const [comments, setComments] = useState([]);
  const {loadComments} = useContext(DbContext);
  useEffect(async () => {
    let mounted = true;
    loadComments(post.id, 3).then(res => {
      if (mounted) {
        setComments(res);
        setLoading(false);
      }
    });
    return function () {
      mounted = false;
    };
  }, []);
  const renderVote = () => {
    return (
      <View style={{marginBottom: 40}}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Text style={styles.descriptionTitle}>{'Xếp hạng địa điểm này'}</Text>
          <Text
            style={{
              fontSize: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {'Cho người khác biết suy nghĩ của bạn'}
          </Text>
        </View>
        <View style={{width: windowWidth - 40}}>
          <AirbnbRating
            selectedColor="#f15454"
            reviewColor="#f15454"
            count={5}
            reviews={['Kinh khủng', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']}
            defaultRating={star}
            size={40}
            onFinishRating={star => {
              setStar(star);
            }}
          />
          <Pressable
            onPress={() => {
              navigation.navigate('Rate', {
                desName: post.name,
                desId: post.id,
                star,
                metadata: post.rate,
              });
            }}
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Viết đánh giá
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  const renderComment = () => {
    return loading
      ? [1, 2, 3].map(item => (
          <View
            key={item}
            style={{
              width: windowWidth - 40,
              marginVertical: 15,
            }}>
            <ContentLoader
              speed={2}
              width={windowWidth - 40}
              height={120}
              viewBox={`0 0 ${windowWidth - 40} 120`}
              backgroundColor="#dcdcdc"
              foregroundColor="#f5f5f5">
              <Rect x="60" y="8" rx="4" ry="4" width="100" height="8" />
              <Rect x="60" y="26" rx="4" ry="4" width="70" height="8" />
              <Rect x="0" y="61" rx="4" ry="4" width="410" height="8" />
              <Rect x="0" y="83" rx="4" ry="4" width="410" height="8" />
              <Rect x="0" y="104" rx="4" ry="4" width="178" height="8" />
              <Circle cx="25" cy="25" r="25" />
            </ContentLoader>
          </View>
        ))
      : comments.map(item => <CommentItem comment={item} key={item.key} />);
  };

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
        {renderVote()}
        <Pressable
          onPress={() =>
            navigation.navigate('Comment', {
              postId: post.id,
              postName: post.name,
              metadata: post.rate,
            })
          }>
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
                    fontSize: 22,
                    color: '#000',
                  }}>
                  {post.rate.avg}
                </Text>
                /5
              </Text>
              <AirbnbRating
                selectedColor="#f15454"
                count={5}
                defaultRating={post.rate.avg}
                size={16}
                isDisabled
                showRating={false}
              />
            </View>
          </View>
          {renderComment()}
        </Pressable>
      </View>
    </View>
  );
};

const CommentItem = ({comment}) => {
  return (
    <View style={cmtStyle.container}>
      <View style={cmtStyle.header}>
        <Avatar
          rounded
          size="medium"
          source={
            comment.avatar
              ? {uri: comment.avatar}
              : require('../../../assets/images/anonymous.png')
          }
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
            {comment.voter}
          </Text>

          <AirbnbRating
            selectedColor="#f15454"
            count={comment.star}
            defaultRating={comment.star}
            size={16}
            isDisabled
            showRating={false}
          />
        </View>
      </View>
      <View>
        <Text numberOfLines={3} style={{lineHeight: 22, fontSize: 16}}>
          {comment.comment}
        </Text>
      </View>
    </View>
  );
};

export default DetailPost;
