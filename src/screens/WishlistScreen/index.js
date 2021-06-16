import React from 'react';
import {View, Text, FlatList, SafeAreaView, StatusBar} from 'react-native';
import WishlistItem from '../../components/WishlistItem';
import places from '../../../assets/data/feed';
import savedList from '../../../assets/data/saved';

const WishlistScreen = () => {
  console.log('wishlist screen render');
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={savedList}
          renderItem={({item}) => <WishlistItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default WishlistScreen;
