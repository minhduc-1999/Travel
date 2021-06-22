import React, { useContext, useEffect, useState } from 'react';
import {View, Text, FlatList, SafeAreaView, StatusBar, ActivityIndicator, Pressable} from 'react-native';
import WishlistItem from '../../components/WishlistItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DbContext } from '../../Services/DbProvider';
import styles from './styles';

const WishlistScreen = ({navigation}) => {
  const {loadWishlists} = useContext(DbContext);
  const [wishlistsData, setWishlistsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      fetchWishlistsData();
    })
    return unsubscribe;
  }, [navigation]);

  const fetchWishlistsData = () => {
    loadWishlists()
      .then(data => {
        setWishlistsData(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#f15454'} />
        </View>
      ) : (
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={wishlistsData}
              renderItem={({item}) => <WishlistItem item={item} />}
              keyExtractor={item => item.createDate}
            />
          </View>
      )}
    </SafeAreaView>
  );
};

export default WishlistScreen;
