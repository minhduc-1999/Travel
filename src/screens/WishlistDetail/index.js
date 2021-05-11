import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import places from '../../../assets/data/feed';
import savedList from '../../../assets/data/saved';
import styles from './styles';
import WishlistDetailItem from '../../components/WishlistDetailItem';
import { Value } from 'react-native-reanimated';

const WishlistDetail = () => {
    return (
      <View style={styles.container}>
          <Text style={styles.title} >
            {savedList[0].name}
          </Text>
          <Divider style={styles.separator} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={places}
            renderItem={({item}) => <WishlistDetailItem item={item} />}
            keyExtractor={item => item.id}
          />
      </View>
    );
};

export default WishlistDetail;
