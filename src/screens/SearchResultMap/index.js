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
  withSpring,
} from 'react-native-reanimated';
import SECRET from '../../../secret';
import MapConfig from '../../../map_config';
import Post from '../../components/Post';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {NotSelected, Selected} from '../../../assets/images/MapIcon/location';
import CustomHeader from '../../components/CustomHeader';
import Waiting from '../Splash';

const SearchResultMap = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [curLocation, setCurLocation] = useState(route.params.pos);
  const [selectedPlaceId, setSelectedPlaceId] = useState(0);
  const {loadDestinations, registerEvent} = React.useContext(DbContext);
  const carouselRef = useRef();

  useEffect(() => {
    console.log('[LOAD DES BY COOR]');
    setCurLocation(route.params.pos);
    setLoading(true);
    let mounted = true;
    loadDestinations(
      [
        Number(route.params.pos.coordinates.lat),
        Number(route.params.pos.coordinates.long),
      ],
      MapConfig.SearchLimit,
      MapConfig.SearchRadiusOffset,
    ).then(res => {
      if (mounted) {
        console.log('[QUERY]', res.length);
        if (res.length) {
          setPlaces(res);
          setSelectedPlaceId(0);
        }
        setLoading(false);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, [route.params.pos.coordinates.lat, route.params.pos.coordinates.long]);

  useEffect(() => {
    const unsub = registerEvent('onPostComment', upData => {
      const newData = places.map(item => {
        if (item.id === upData.desId) return {...item, rate: upData.rate};
        return item;
      });
      setPlaces(newData);
    });
    return unsub;
  });
  const sheetRef = useRef(null);
  const bsScrollY = useSharedValue(100);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [-1, 0, 70, 71];
    return {
      paddingTop: interpolate(bsScrollY.value, inputRange, [20, 20, 0, 0]),
      width: interpolate(bsScrollY.value, inputRange, [
        windowWidth,
        windowWidth,
        windowWidth - 60,
        windowWidth - 60,
      ]),
      height: interpolate(bsScrollY.value, inputRange, [
        70 + StatusBar.currentHeight,
        70 + StatusBar.currentHeight,
        50,
        50,
      ]),
      borderRadius: interpolate(bsScrollY.value, inputRange, [0, 0, 25, 25]),
      transform: [
        {
          translateY: withSpring(
            interpolate(bsScrollY.value, inputRange, [-20, -20, 0, 0]),
          ),
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

  const textAnimStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(bsScrollY.value, [-1, 0, 70, 71], [27, 27, 18, 18]),
      maxWidth: interpolate(
        bsScrollY.value,
        [-1, 0, 70, 71],
        [
          (windowWidth * 70) / 100,
          (windowWidth * 70) / 100,
          (windowWidth * 60) / 100,
          (windowWidth * 60) / 100,
        ],
      ),
      fontWeight: '700',
    };
  });

  console.log('search result map screen render');
  return loading ? (
    <Waiting />
  ) : (
    <SafeAreaView style={{height: '100%'}}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
        style={{zIndex: 100}}
      />
      <CustomHeader
        style={{
          backgroundColor: 'transparent',
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
            <Animated.Text
              numberOfLines={1}
              style={(styles.searchButtonText, textAnimStyle)}>
              {curLocation.name}
            </Animated.Text>
          </Pressable>
          <View style={{flex: 1}}></View>
        </Animated.View>
      </CustomHeader>
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

            {places.length ? (
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
                  <Text
                    style={{fontSize: 17, color: '#fff', fontWeight: 'bold'}}>
                    List <Fonawesome name="bars" color="#fff" size={17} />
                  </Text>
                </Pressable>
              </Animated.View>
            ) : (
              <View
                style={[
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    position: 'absolute',
                    bottom: 20,
                    width: 140,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    zIndex: 100,
                  },
                ]}>
                <Pressable
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('Destination Search', {
                      oldLocation: curLocation,
                    });
                  }}>
                  <Text
                    style={{fontSize: 17, color: '#fff', fontWeight: 'bold'}}>
                    Not Found
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
          <BottomSheet
            ref={sheetRef}
            snapPoints={[0, (windowHeight * 40) / 100, windowHeight]}
            index={0}
            animatedPosition={bsScrollY}
            animateOnMount={true}>
            <BottomSheetFlatList
              style={{marginTop: 60}}
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
