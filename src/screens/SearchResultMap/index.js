import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import styles from './styles';
import PostCarousel from '../../components/PostCarouselItem';
import places from '../../../assets/data/feed';
import CustomMarker from '../../components/CustomMarker';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const SearchResultMap = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  const flatlist = useRef();

  useEffect(() => {
    if (!selectedPlaceId || !flatlist) return;
    const index = places.findIndex(place => place.id === selectedPlaceId);
    flatlist.current.scrollToIndex({index: index});
  }, [selectedPlaceId]);

  const itemWidth = useWindowDimensions().width;

  const viewConfig = useRef({
    itemVisiblePercentThreshold: 80,
    minimumViewTime: 200,
  });

  const onViewChange = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const place = viewableItems[0].item;
      setSelectedPlaceId(place.id);
    }
  });
  console.log('search result map screen render');
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View style={styles.container}>
        {/* Map here */}
        {/* <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView> */}
        {/* <View>
        {places.map(place => (
          <CustomMarker
            key={place.id}
            onPress={() => setSelectedPlaceId(place.id)}
            price={place.newPrice}
            isSelected={place.id === selectedPlaceId}
          />
        ))}
      </View> */}

        <View style={styles.carouselList}>
          <FlatList
            ref={flatlist}
            data={places}
            renderItem={({item}) => <PostCarousel post={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemWidth - 40}
            snapToAlignment={'center'}
            decelerationRate={'fast'}
            pagingEnabled={true}
            viewabilityConfig={viewConfig.current}
            onViewableItemsChanged={onViewChange.current}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchResultMap;
