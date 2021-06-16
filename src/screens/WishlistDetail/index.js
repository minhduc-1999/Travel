import React from 'react';
import {View, Text, FlatList, SafeAreaView, StatusBar} from 'react-native';
import {Divider} from 'react-native-elements';
import places from '../../../assets/data/feed';
import savedList from '../../../assets/data/saved';
import styles from './styles';
import WishlistDetailItem from '../../components/WishlistDetailItem';
import {Value} from 'react-native-reanimated';

const WishlistDetail = () => {
  console.log('wishlist detail screen render');
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>{savedList[0].name}</Text>
        <Divider style={styles.separator} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={places}
          renderItem={({item}) => <WishlistDetailItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default WishlistDetail;
