import React from 'react';
import {View, Text, FlatList, SafeAreaView, StatusBar} from 'react-native';
import {Divider} from 'react-native-elements';
import styles from './styles';
import WishlistDetailItem from '../../components/WishlistDetailItem';
import {Value} from 'react-native-reanimated';
import Post from '../../components/Post';

const WishlistDetail = ({route, navigation}) => {
  const {places, name} = route.params;
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
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
