import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import {DbContext} from '../../Services/DbProvider';
import {Divider} from 'react-native-elements';
import styles from './styles';
import WishlistDetailItem from '../../components/WishlistDetailItem';
import {Value} from 'react-native-reanimated';
import Post from '../../components/Post';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {degreesToRadians} from 'geofire-common';

const WishlistDetail = ({route, navigation}) => {
  const {onWishlistChange} = useContext(DbContext);
  const {places, wishlist} = route.params;
  const [curPlaces, setCurPlaces] = useState(places);
  const [curWishlist, setCurWishlist] = useState(wishlist);

  useEffect(() => {
    const unsubscribe = onWishlistChange(data => {
      setCurWishlist({...curWishlist, name: data});
    }, 'wishlistNameChange');
    const unsub = onWishlistChange(data => {
      setCurPlaces(
        places.filter(place => {
          return place.id !== data;
        }),
      );
    }, 'wishlistDesChange');
    return () => {
      unsubscribe();
      unsub();
    };
  });

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>{curWishlist.name}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('MenuWishlist', {detail: curWishlist});
          }}
          style={styles.menuButton}>
          <FontAwesome name="ellipsis-v" size={25} />
        </Pressable>
        <Divider style={styles.separator} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={curPlaces}
          renderItem={({item}) => <Post post={item} />}
          keyExtractor={item => item.name}
        />
      </View>
    </SafeAreaView>
  );
};

export default WishlistDetail;
