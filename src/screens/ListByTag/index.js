import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Pressable,
  Text,
} from 'react-native';
import Post from '../../components/Post';
import {DbContext} from '../../Services/DbProvider';
import styles from './style';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {API_CALL_CONFIG} from '../../../map_config';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {windowHeight, windowWidth} from '../../Utils/Dimention';
import ContentLoader, {Rect} from 'react-content-loader/native';

// const data = [
//   {
//     id: 1,
//     address:
//       'Nằm trên tỉnh lộ 15, ấp Phú Hiệp, xã Phú Mỹ Hưng, Huyện Củ Chi, Hồ Chí Minh',
//     coordinate: {
//       latitude: '106.46024511569824',
//       longitude: '11.142993359373607',
//     },
//     description:
//       'Trước đây, địa đạo Củ Chi là căn cứ kháng chiến, hệ thống phòng thủ trong lòng đất của quân và dân ta trong thời kỳ chiến tranh Đông Dương và chiến tranh Việt Nam. Củ Chỉ được nhiều người mệnh danh là “thành phố trong lòng đất” bởi không chỉ có hệ thống đường hầm như mê cung mà còn có rất nhiều phòng, kho chứa, nhà bếp, bệnh xá, phòng làm việc,… Ngày nay nó không chỉ là một di tích cấp quốc gia mà còn địa điểm du lịch Sài Gòn ban ngày nổi tiếng, thu hút khoảng 20 triệu lượt khách trong và ngoài nước mỗi năm.',
//     images: [
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fdia-dao-cu-chi-3.jpg?alt=media&token=256e0ce6-9bcd-4fb2-8e64-175f21731ca8',
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fkinh-nghiem-tham-quan-dia-dao-cu-chi-1.jpg?alt=media&token=3275c34c-6e4e-4187-9f34-0b8ea1b61730',
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fthuyet-minh-ve-di-tich-lich-su-dia-dao-cu-chi-1.jpg?alt=media&token=a97533d7-9183-4a2f-85c2-fe5f3b737abc',
//     ],
//     name: 'Địa đạo Củ Chi',
//     openTime: 'Giá vé: 20k/người Việt, 110k/người nước ngoài',
//     price: '',
//     tags: ['Di tích', 'Khám phá', 'Nghệ thuật'],
//   },
//   {
//     id: 2,
//     address:
//       'Nằm trên tỉnh lộ 15, ấp Phú Hiệp, xã Phú Mỹ Hưng, Huyện Củ Chi, Hồ Chí Minh',
//     coordinate: {
//       latitude: '106.46024511569824',
//       longitude: '11.142993359373607',
//     },
//     description:
//       'Trước đây, địa đạo Củ Chi là căn cứ kháng chiến, hệ thống phòng thủ trong lòng đất của quân và dân ta trong thời kỳ chiến tranh Đông Dương và chiến tranh Việt Nam. Củ Chỉ được nhiều người mệnh danh là “thành phố trong lòng đất” bởi không chỉ có hệ thống đường hầm như mê cung mà còn có rất nhiều phòng, kho chứa, nhà bếp, bệnh xá, phòng làm việc,… Ngày nay nó không chỉ là một di tích cấp quốc gia mà còn địa điểm du lịch Sài Gòn ban ngày nổi tiếng, thu hút khoảng 20 triệu lượt khách trong và ngoài nước mỗi năm.',
//     images: [
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fdia-dao-cu-chi-3.jpg?alt=media&token=256e0ce6-9bcd-4fb2-8e64-175f21731ca8',
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fkinh-nghiem-tham-quan-dia-dao-cu-chi-1.jpg?alt=media&token=3275c34c-6e4e-4187-9f34-0b8ea1b61730',
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fthuyet-minh-ve-di-tich-lich-su-dia-dao-cu-chi-1.jpg?alt=media&token=a97533d7-9183-4a2f-85c2-fe5f3b737abc',
//     ],
//     name: 'Địa đạo Củ Chi',
//     openTime: 'Giá vé: 20k/người Việt, 110k/người nước ngoài',
//     price: '',
//     tags: ['Di tích', 'Khám phá', 'Nghệ thuật'],
//   },
//   {
//     id: 1,
//     address:
//       'Nằm trên tỉnh lộ 15, ấp Phú Hiệp, xã Phú Mỹ Hưng, Huyện Củ Chi, Hồ Chí Minh',
//     coordinate: {
//       latitude: '106.46024511569824',
//       longitude: '11.142993359373607',
//     },
//     description:
//       'Trước đây, địa đạo Củ Chi là căn cứ kháng chiến, hệ thống phòng thủ trong lòng đất của quân và dân ta trong thời kỳ chiến tranh Đông Dương và chiến tranh Việt Nam. Củ Chỉ được nhiều người mệnh danh là “thành phố trong lòng đất” bởi không chỉ có hệ thống đường hầm như mê cung mà còn có rất nhiều phòng, kho chứa, nhà bếp, bệnh xá, phòng làm việc,… Ngày nay nó không chỉ là một di tích cấp quốc gia mà còn địa điểm du lịch Sài Gòn ban ngày nổi tiếng, thu hút khoảng 20 triệu lượt khách trong và ngoài nước mỗi năm.',
//     images: [
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fdia-dao-cu-chi-3.jpg?alt=media&token=256e0ce6-9bcd-4fb2-8e64-175f21731ca8',
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fkinh-nghiem-tham-quan-dia-dao-cu-chi-1.jpg?alt=media&token=3275c34c-6e4e-4187-9f34-0b8ea1b61730',
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fthuyet-minh-ve-di-tich-lich-su-dia-dao-cu-chi-1.jpg?alt=media&token=a97533d7-9183-4a2f-85c2-fe5f3b737abc',
//     ],
//     name: 'Địa đạo Củ Chi',
//     openTime: 'Giá vé: 20k/người Việt, 110k/người nước ngoài',
//     price: '',
//     tags: ['Di tích', 'Khám phá', 'Nghệ thuật'],
//   },
//   {
//     id: 1,
//     address:
//       'Nằm trên tỉnh lộ 15, ấp Phú Hiệp, xã Phú Mỹ Hưng, Huyện Củ Chi, Hồ Chí Minh',
//     coordinate: {
//       latitude: '106.46024511569824',
//       longitude: '11.142993359373607',
//     },
//     description:
//       'Trước đây, địa đạo Củ Chi là căn cứ kháng chiến, hệ thống phòng thủ trong lòng đất của quân và dân ta trong thời kỳ chiến tranh Đông Dương và chiến tranh Việt Nam. Củ Chỉ được nhiều người mệnh danh là “thành phố trong lòng đất” bởi không chỉ có hệ thống đường hầm như mê cung mà còn có rất nhiều phòng, kho chứa, nhà bếp, bệnh xá, phòng làm việc,… Ngày nay nó không chỉ là một di tích cấp quốc gia mà còn địa điểm du lịch Sài Gòn ban ngày nổi tiếng, thu hút khoảng 20 triệu lượt khách trong và ngoài nước mỗi năm.',
//     images: [
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fdia-dao-cu-chi-3.jpg?alt=media&token=256e0ce6-9bcd-4fb2-8e64-175f21731ca8',
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fkinh-nghiem-tham-quan-dia-dao-cu-chi-1.jpg?alt=media&token=3275c34c-6e4e-4187-9f34-0b8ea1b61730',
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fthuyet-minh-ve-di-tich-lich-su-dia-dao-cu-chi-1.jpg?alt=media&token=a97533d7-9183-4a2f-85c2-fe5f3b737abc',
//     ],
//     name: 'Địa đạo Củ Chi',
//     openTime: 'Giá vé: 20k/người Việt, 110k/người nước ngoài',
//     price: '',
//     tags: ['Di tích', 'Khám phá', 'Nghệ thuật'],
//   },
//   {
//     id: 1,
//     address:
//       'Nằm trên tỉnh lộ 15, ấp Phú Hiệp, xã Phú Mỹ Hưng, Huyện Củ Chi, Hồ Chí Minh',
//     coordinate: {
//       latitude: '106.46024511569824',
//       longitude: '11.142993359373607',
//     },
//     description:
//       'Trước đây, địa đạo Củ Chi là căn cứ kháng chiến, hệ thống phòng thủ trong lòng đất của quân và dân ta trong thời kỳ chiến tranh Đông Dương và chiến tranh Việt Nam. Củ Chỉ được nhiều người mệnh danh là “thành phố trong lòng đất” bởi không chỉ có hệ thống đường hầm như mê cung mà còn có rất nhiều phòng, kho chứa, nhà bếp, bệnh xá, phòng làm việc,… Ngày nay nó không chỉ là một di tích cấp quốc gia mà còn địa điểm du lịch Sài Gòn ban ngày nổi tiếng, thu hút khoảng 20 triệu lượt khách trong và ngoài nước mỗi năm.',
//     images: [
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fdia-dao-cu-chi-3.jpg?alt=media&token=256e0ce6-9bcd-4fb2-8e64-175f21731ca8',
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fkinh-nghiem-tham-quan-dia-dao-cu-chi-1.jpg?alt=media&token=3275c34c-6e4e-4187-9f34-0b8ea1b61730',
//       'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fthuyet-minh-ve-di-tich-lich-su-dia-dao-cu-chi-1.jpg?alt=media&token=a97533d7-9183-4a2f-85c2-fe5f3b737abc',
//     ],
//     name: 'Địa đạo Củ Chi',
//     openTime: 'Giá vé: 20k/người Việt, 110k/người nước ngoài',
//     price: '',
//     tags: ['Di tích', 'Khám phá', 'Nghệ thuật'],
//   },
// ];

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const SearchResultScreen = ({route, navigation}) => {
  const tags = useRef(route.params.tags);
  const [curTagIndex, SetCurTagIndex] = useState(route.params.selectedTagIndex);
  const [data, setData] = useState([]);
  // const [limit, setLimit] = useState(2);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const {
    loadDestinationsByTag,
    loadMoreDestinationsByTag,
    registerEvent,
  } = React.useContext(DbContext);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const listContainerStyle = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(
        scrollY.value,
        [100, 200],
        [70, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  const tagSelectorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [100, 200],
            [0, -70],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  useEffect(() => {
    // console.log('[EFFECT LOAD]');
    let mounted = true;
    loadDestinationsByTag(
      tags.current[curTagIndex].name,
      API_CALL_CONFIG.limit,
    ).then(res => {
      if (mounted) {
        // console.log('[effect load]', res.length);
        if (res.length) {
          setData(res);
          setLastVisible(res[res.length - 1].coordinate.latitude);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, [curTagIndex]);

  useEffect(() => {
    const unsub = registerEvent('onPostComment', res => {
      //console.log('[sub on post]', res);
      const newData = data.map(item => {
        if (item.id === res.desId) return {...item, rate: res.rate};
        return item;
      });
      setData(newData);
    });
    return unsub;
  });
  console.log('List By tag screen render');
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Animated.View style={styles.header}>
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
            {tags.current[curTagIndex].name}
          </Text>
        </View>
        <View style={{flex: 1}}></View>
      </Animated.View>

      <View style={styles.container}>
        <Animated.View style={[styles.tagSelector, tagSelectorStyle]}>
          <FlatList
            initialScrollIndex={curTagIndex}
            style={{
              // marginHorizontal: 30,
              flex: 1,
            }}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            data={tags.current}
            horizontal
            keyExtractor={item => item.refId}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TapGestureHandler
                  key={item.refId}
                  onActivated={() => {
                    SetCurTagIndex(index);
                    // console.log('click ne');
                    setHasMore(true);
                    setLoading(true);
                  }}>
                  <View
                    // key={item.refId}
                    style={[
                      styles.tagItem,
                      {
                        backgroundColor:
                          curTagIndex === index ? '#f15454' : '#fff',
                        borderColor: curTagIndex === index ? '#f15454' : 'grey',
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: curTagIndex === index ? '#fff' : '#000',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TapGestureHandler>
              );
            }}
          />
        </Animated.View>

        <Animated.View style={[styles.listContainer, listContainerStyle]}>
          {loading ? (
            <FlatList
              keyExtractor={item => item}
              style={{width: windowWidth, overflow: 'hidden', padding: 20}}
              scrollEnabled={false}
              data={[1, 2]}
              renderItem={({item}) => (
                <View
                  key={item}
                  style={{
                    width: windowWidth - 40,
                    height: windowHeight * 0.4,
                    overflow: 'hidden',
                    marginBottom: 20,
                  }}>
                  <ContentLoader
                    backgroundColor="#dcdcdc"
                    foregroundColor="#f5f5f5"
                    speed={1}
                    viewBox={`0 0 ${windowWidth - 40} ${windowHeight * 0.4}`}
                    height={windowHeight * 0.4}
                    width={windowWidth - 40}>
                    <Rect
                      x="0"
                      y="0"
                      rx="20"
                      ry="20"
                      width={windowWidth - 40}
                      height={windowHeight * 0.4 - 60}
                    />
                    <Rect
                      x="0"
                      y={windowHeight * 0.4 - 55}
                      rx="3"
                      ry="3"
                      width="80"
                      height="20"
                    />
                    <Rect
                      x="0"
                      y={windowHeight * 0.4 - 25}
                      rx="3"
                      ry="3"
                      width={windowWidth - 40}
                      height="20"
                    />
                  </ContentLoader>
                </View>
              )}
            />
          ) : (
            <AnimatedFlatlist
              showsVerticalScrollIndicator={false}
              onScroll={scrollHandler}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (hasMore) {
                  setRefreshing(true);
                  loadMoreDestinationsByTag(
                    tags.current[curTagIndex].name,
                    API_CALL_CONFIG.limit,
                    lastVisible,
                  ).then(res => {
                    // console.log('load more', res.length);
                    if (res.length) {
                      setData([...data, ...res]);
                      setLastVisible(res[res.length - 1].coordinate.latitude);
                      setRefreshing(false);
                    } else {
                      setHasMore(false);
                    }
                  });
                }
              }}
              ListFooterComponent={() =>
                loading ? <ActivityIndicator color={'#f15454'} /> : null
              }
              data={data}
              renderItem={({item}) => (
                <Post showTags={false} key={item.id.toString()} post={item} />
              )}
              keyExtractor={item => item.id.toString()}
              refreshing={refreshing}
            />
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
export default SearchResultScreen;
