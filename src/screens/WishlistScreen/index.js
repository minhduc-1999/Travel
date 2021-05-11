import React from 'react'
import { View, Text, FlatList } from 'react-native'
import WishlistItem from '../../components/WishlistItem';
import places from '../../../assets/data/feed';
import savedList from '../../../assets/data/saved';

const WishlistScreen = () => {
    return (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={savedList}
            renderItem={({item}) => <WishlistItem item={item}/>}
            keyExtractor={item => item.id}
          />
        </View>
    );
};

export default WishlistScreen;
