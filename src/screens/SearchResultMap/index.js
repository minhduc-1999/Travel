import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Pressable,
  StatusBar,
} from 'react-native';
import styles from './styles';
import PostCarousel from '../../components/PostCarouselItem';
import Carousel from 'react-native-snap-carousel';
import {windowWidth, windowHeight} from '../../Utils/Dimention';
import CustomMarker from '../../components/CustomMarker';
import BingMapsView from 'react-native-bing-maps';
import {DbContext} from '../../Services/DbProvider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  interpolateColors,
  Extrapolate,
} from 'react-native-reanimated';
import SECRET from '../../../secret';
import MapConfig from '../../../map_config';
import Post from '../../components/Post';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {NotSelected, Selected} from '../../../assets/images/MapIcon/location';
const arr = [
  {
    address:
      'Nằm trên tỉnh lộ 15, ấp Phú Hiệp, xã Phú Mỹ Hưng, Huyện Củ Chi, Hồ Chí Minh',
    coordinate: {
      latitude: '106.46024511569824',
      longitude: '11.142993359373607',
    },
    description:
      'Trước đây, địa đạo Củ Chi là căn cứ kháng chiến, hệ thống phòng thủ trong lòng đất của quân và dân ta trong thời kỳ chiến tranh Đông Dương và chiến tranh Việt Nam. Củ Chỉ được nhiều người mệnh danh là “thành phố trong lòng đất” bởi không chỉ có hệ thống đường hầm như mê cung mà còn có rất nhiều phòng, kho chứa, nhà bếp, bệnh xá, phòng làm việc,… Ngày nay nó không chỉ là một di tích cấp quốc gia mà còn địa điểm du lịch Sài Gòn ban ngày nổi tiếng, thu hút khoảng 20 triệu lượt khách trong và ngoài nước mỗi năm.',
    images: [
      'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fdia-dao-cu-chi-3.jpg?alt=media&token=256e0ce6-9bcd-4fb2-8e64-175f21731ca8',
      'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fkinh-nghiem-tham-quan-dia-dao-cu-chi-1.jpg?alt=media&token=3275c34c-6e4e-4187-9f34-0b8ea1b61730',
      'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fthuyet-minh-ve-di-tich-lich-su-dia-dao-cu-chi-1.jpg?alt=media&token=a97533d7-9183-4a2f-85c2-fe5f3b737abc',
    ],
    name: 'Địa đạo Củ Chi',
    openTime: 'Giá vé: 20k/người Việt, 110k/người nước ngoài',
    price: '',
    tags: ['Di tích', 'Khám phá', 'Nghệ thuật'],
  },
  {
    address:
      'Nằm trên tỉnh lộ 15, ấp Phú Hiệp, xã Phú Mỹ Hưng, Huyện Củ Chi, Hồ Chí Minh',
    coordinate: {
      latitude: '106.46024511569824',
      longitude: '11.142993359373607',
    },
    description:
      'Trước đây, địa đạo Củ Chi là căn cứ kháng chiến, hệ thống phòng thủ trong lòng đất của quân và dân ta trong thời kỳ chiến tranh Đông Dương và chiến tranh Việt Nam. Củ Chỉ được nhiều người mệnh danh là “thành phố trong lòng đất” bởi không chỉ có hệ thống đường hầm như mê cung mà còn có rất nhiều phòng, kho chứa, nhà bếp, bệnh xá, phòng làm việc,… Ngày nay nó không chỉ là một di tích cấp quốc gia mà còn địa điểm du lịch Sài Gòn ban ngày nổi tiếng, thu hút khoảng 20 triệu lượt khách trong và ngoài nước mỗi năm.',
    images: [
      'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fdia-dao-cu-chi-3.jpg?alt=media&token=256e0ce6-9bcd-4fb2-8e64-175f21731ca8',
      'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fkinh-nghiem-tham-quan-dia-dao-cu-chi-1.jpg?alt=media&token=3275c34c-6e4e-4187-9f34-0b8ea1b61730',
      'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fdestination%2FDia%20Dao%20Cu%20Chi%2Fthuyet-minh-ve-di-tich-lich-su-dia-dao-cu-chi-1.jpg?alt=media&token=a97533d7-9183-4a2f-85c2-fe5f3b737abc',
    ],
    name: 'Địa đạo Củ Chi',
    openTime: 'Giá vé: 20k/người Việt, 110k/người nước ngoài',
    price: '',
    tags: ['Di tích', 'Khám phá', 'Nghệ thuật'],
  },
];

const SearchResultMap = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [curLocation, setCurLocation] = useState(route.params.pos);
  const [selectedPlaceId, setSelectedPlaceId] = useState(0);
  const {loadDestinations} = React.useContext(DbContext);
  const carouselRef = useRef();
  // const [bsOpen, setBsOpen] = useState(false);

  React.useEffect(() => {
    let mounted = true;
    loadDestinations(
      [
        Number(curLocation.coordinates.lat),
        Number(curLocation.coordinates.long),
      ],
      MapConfig.SearchLimit,
      MapConfig.SearchRadiusOffset,
    ).then(res => {
      if (mounted) {
        console.log('[QUERY]', res.length);
        if (res.length) {
          // console.log('[RES]', res);
          setPlaces(res);
        }
        setLoading(false);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  const sheetRef = useRef(null);
  const bsScrollY = useSharedValue(0);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [-1, 0, 70, 71];
    return {
      width: interpolate(bsScrollY.value, inputRange, [
        windowWidth,
        windowWidth,
        windowWidth - 60,
        windowWidth - 60,
      ]),
      height: interpolate(bsScrollY.value, inputRange, [
        60 + StatusBar.currentHeight,
        60 + StatusBar.currentHeight,
        50,
        50,
      ]),
      marginHorizontal: interpolate(bsScrollY.value, inputRange, [
        0,
        0,
        30,
        30,
      ]),
      borderRadius: interpolate(bsScrollY.value, inputRange, [0, 0, 25, 25]),
      transform: [
        {
          translateY: interpolate(bsScrollY.value, inputRange, [
            0,
            0,
            StatusBar.currentHeight + 5,
            StatusBar.currentHeight + 5,
          ]),
        },
      ],
    };
  });

  const mapBtnAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(bsScrollY.value, [0, 200], [1, 0]),
      zIndex: interpolate(bsScrollY.value, [0, 200], [100, 50]),
    };
  });

  const listBtnAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(bsScrollY.value, [330, windowHeight - 50], [0, 1]),
      zIndex: interpolate(bsScrollY.value, [0, 200], [50, 100]),
    };
  });

  // const onPinClick = event => {
  //   console.log(event);
  // };

  // const onMapStatusChange = event => {
  //   console.log('[TEST EVENT]', event);
  // };

  console.log('search result map screen render');
  return (
    <SafeAreaView style={{height: '100%'}}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
        style={{zIndex: 100}}
      />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#f15454'} />
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Animated.View style={[styles.searchButton, headerAnimatedStyle]}>
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
              <Pressable
                style={{marginRight: 10, flex: 4}}
                onPress={() =>
                  navigation.navigate('Destination Search', {
                    oldLocation: curLocation,
                  })
                }>
                <Text numberOfLines={1} style={styles.searchButtonText}>
                  {curLocation.name}
                </Text>
              </Pressable>
              <View style={{flex: 1}}></View>
            </Animated.View>

            {/* Map here */}
            <BingMapsView
              credentialsKey={SECRET.KEY}
              compassButtonVisible={true}
              mapLocation={{
                lat: Number(curLocation.coordinates.lat),
                long: Number(curLocation.coordinates.long),
                zoom: 14,
              }}
              style={styles.map}
              // onMapPinClicked={onPinClick}
              // onMapLoadingStatusChanged={onMapStatusChange}
              pins={places.map((des, index) => {
                return {
                  lat: Number(des.coordinate.latitude),
                  long: Number(des.coordinate.longitude),
                  icon: index === selectedPlaceId ? Selected : NotSelected,
                };
              })}
            />

            <View style={styles.carouselList}>
              <Carousel
                ref={carouselRef}
                data={places}
                renderItem={({item}) => <PostCarousel post={item} />}
                sliderWidth={windowWidth}
                sliderHeight={150}
                itemWidth={windowWidth - 70}
                inactiveSlideOpacity={1}
                inactiveSlideScale={0.9}
                lockScrollWhileSnapping={true}
                onSnapToItem={slideIndex => {
                  setSelectedPlaceId(slideIndex);
                  console.log('snap');
                }}
              />
            </View>

            <Animated.View
              style={[
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.91)',
                  position: 'absolute',
                  bottom: 20,
                  width: 100,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  zIndex: 100,
                },
                mapBtnAnimatedStyle,
              ]}>
              <Pressable
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  sheetRef.current.snapTo(0, 1000);
                  // console.log('tap tap');
                }}>
                <Text style={{fontSize: 17, color: '#fff', fontWeight: 'bold'}}>
                  Map <Fonawesome name="map" color="#fff" size={17} />
                </Text>
              </Pressable>
            </Animated.View>

            <Animated.View
              style={[
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  position: 'absolute',
                  bottom: 2,
                  width: 100,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  zIndex: 100,
                },
                listBtnAnimatedStyle,
              ]}>
              <Pressable
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  sheetRef.current.snapTo(1, 500);
                }}>
                <Text style={{fontSize: 17, color: '#fff', fontWeight: 'bold'}}>
                  List <Fonawesome name="bars" color="#fff" size={17} />
                </Text>
              </Pressable>
            </Animated.View>
          </View>
          <BottomSheet
            ref={sheetRef}
            snapPoints={[0, 330, windowHeight]}
            index={1}
            animatedPosition={bsScrollY}
            // onChange={index => {
            //   index === 2 ? setBsOpen(true) : setBsOpen(false);
            // }}
            animateOnMount={true}>
            <BottomSheetFlatList
              style={{marginTop: 50}}
              data={places}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <Post
                  style={{
                    marginHorizontal: 20,
                    marginVertical: 15,
                  }}
                  titleStyle={{fontSize: 22}}
                  key={index}
                  post={item}
                />
              )}
            />
          </BottomSheet>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchResultMap;
