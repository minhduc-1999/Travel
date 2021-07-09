import React, {useContext, useEffect, useState} from 'react';
import {AirbnbRating, Avatar, Rating} from 'react-native-elements';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import styles, {cmtStyle} from './style';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import {windowWidth} from '../../Utils/Dimention';
import {DbContext} from '../../Services/DbProvider';

const limit = 10;

const comment = ({route, navigation}) => {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const {loadComments, loadMoreComments} = useContext(DbContext);
  const [metadata, setMetadata] = useState(route.params.metadata);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadComments(route.params.postId, limit)
      .then(res => {
        if (mounted) {
          if (res.length) {
            setComments(res);
            setLastVisible(res[res.length - 1].dateCreated);
          } else {
            setHasMore(false);
          }
          setLoading(false);
        }
      })
      .catch(console.error);

    return function () {
      mounted = false;
    };
  }, []);
  //   const destination = useRef(route.params.destination);
  const renderOption = () => {
    // const report = [0, 0, 0, 1, 1];
    // const {report} = route.params;
    return metadata.report.map((item, index) => (
      <StarItem
        key={index}
        isSelected={index + 1 === selected}
        star={index + 1}
        amount={item}
        // onPress={() => setSelected(index + 1)}
      />
    ));
  };
  // const {metadata} = route.params;
  // const metadata = {avg: 4.5};
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <View style={styles.header}>
        <Pressable
          style={{
            flex: 1,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
          }}
          onPress={() => navigation.goBack()}>
          <Fonawesome name={'chevron-left'} color={'#000'} size={24} />
        </Pressable>
        <View style={{marginRight: 10, flex: 4}}>
          <Text numberOfLines={1} style={styles.title}>
            {route.params.postName}
          </Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={styles.topMain}></View>
      <View style={styles.main}>
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.control}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: 20,
                  paddingVertical: 10,
                }}>
                <Text style={{marginRight: 10, fontSize: 18, color: 'silver'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#000',
                    }}>
                    {metadata.avg}
                  </Text>
                  /5
                </Text>
                <Rating
                  type="custom"
                  ratingImage={require('../../../assets/images/star.png')}
                  ratingBackgroundColor="#fff"
                  ratingColor="#f15454"
                  ratingCount={5}
                  startingValue={metadata.avg}
                  imageSize={22}
                  readonly
                  showRating={false}
                  style={{paddingVertical: 10}}
                />
                {/* <AirbnbRating
                  selectedColor="#f15454"
                  count={5}
                  defaultRating={metadata.avg}
                  size={22}
                  isDisabled
                  showRating={false}
                /> */}
              </View>
              <View style={styles.option}>{renderOption()}</View>
            </View>
          )}
          ListFooterComponent={() =>
            loading ? <ActivityIndicator color={'#f15454'} /> : null
          }
          refreshing={refreshing}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (hasMore) {
              setRefreshing(true);
              loadMoreComments(route.params.postId, limit, lastVisible).then(
                res => {
                  console.log('load more comment', res.length);
                  if (res.length) {
                    setComments([...comments, ...res]);
                    setLastVisible(res[res.length - 1].dateCreated);
                    setRefreshing(false);
                  } else {
                    setHasMore(false);
                  }
                },
              );
            }
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!loading}
          data={loading ? [1, 2, 3, 4] : comments}
          renderItem={
            loading
              ? ({item}) => (
                  <View
                    style={{
                      paddingHorizontal: 20,
                      width: windowWidth - 40,
                      marginVertical: 10,
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
                      <Rect
                        x="0"
                        y="104"
                        rx="4"
                        ry="4"
                        width="178"
                        height="8"
                      />
                      <Circle cx="25" cy="25" r="25" />
                    </ContentLoader>
                  </View>
                )
              : ({item}) => <CommentItem key={item.key} comment={item} />
          }
          style={styles.commentList}
          keyExtractor={loading ? item => item : item => item.key}
        />
      </View>
    </SafeAreaView>
  );
};

const StarItem = props => {
  const {star, amount, isSelected, onPress} = props;
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        overflow: 'hidden',
        height: 36,
        width: 'auto',
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: isSelected ? '#f15454' : 'rgb(240,240,240)',
        backgroundColor: isSelected ? 'rgb(240, 204, 204)' : 'rgb(240,240,240)',
      }}>
      <AirbnbRating
        selectedColor="#f15454"
        count={star}
        defaultRating={star}
        size={14}
        isDisabled
        showRating={false}
      />
      <Text>({amount})</Text>
    </Pressable>
  );
};

const CommentItem = ({comment}) => {
  const timeSince = date => {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + ' năm';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' tháng';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' ngày';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' giờ';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' phút';
    }
    return Math.floor(seconds) + ' giây';
  };

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
              fontSize: 18,
              fontWeight: '500',
              maxWidth: windowWidth * 0.4,
              lineHeight: 26,
            }}>
            {comment.voter}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: 'silver',
              fontSize: 16,
              fontWeight: '500',
              maxWidth: windowWidth * 0.4,
              lineHeight: 26,
            }}>
            {timeSince(comment.dateCreated.toDate())} trước
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 2,
          }}>
          <AirbnbRating
            selectedColor="#f15454"
            count={comment.star}
            defaultRating={comment.star}
            size={20}
            isDisabled
            showRating={false}
          />
        </View>
      </View>
      <View>
        <Text style={{lineHeight: 25, fontSize: 16}}>{comment.comment}</Text>
      </View>
    </View>
  );
};

export default comment;
