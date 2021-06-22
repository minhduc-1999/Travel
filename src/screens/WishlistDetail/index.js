import React from 'react';
import {View, Text, FlatList, SafeAreaView, StatusBar, Pressable} from 'react-native';
import {Divider} from 'react-native-elements';
import styles from './styles';
import WishlistDetailItem from '../../components/WishlistDetailItem';
import {Value} from 'react-native-reanimated';
import Post from '../../components/Post';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WishlistDetail = ({route, navigation}) => {
  const {places, name} = route.params;
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Pressable
          onPress={() => console.log('btn press')}
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
