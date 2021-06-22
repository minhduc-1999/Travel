import React from 'react';
import {View, Text, FlatList, SafeAreaView, StatusBar, Pressable} from 'react-native';
import {Divider} from 'react-native-elements';
import styles from './styles';
import WishlistDetailItem from '../../components/WishlistDetailItem';
import {Value} from 'react-native-reanimated';
import Post from '../../components/Post';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WishlistDetail = ({route, navigation}) => {
  const {places, wishlist} = route.params;
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>{wishlist.name}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('MenuWishlist', {detail: wishlist});
          }}
          style={styles.menuButton}>
          <FontAwesome name='ellipsis-v' size={25} />
        </Pressable>
        <Divider style={styles.separator} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={places}
          renderItem={({item}) => <Post post={item} />}
          keyExtractor={item => item.name}
        />
      </View>
    </SafeAreaView>
  );
};

export default WishlistDetail;
