import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import LandscapeItem from '../../components/LandscapeItem';
import landscape from '../../../assets/data/landscape';
import styles from './styles';

const Landscape = () => {
  return (
    <SafeAreaView
      style={{
        height: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'whitesmoke',
      }}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View
        style={{
          height: '100%',
          width: '100%',
          paddingTop: StatusBar.currentHeight,
        }}>
        <Text style={styles.title}>Về đất nước Việt Nam</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={[landscape]}
          renderItem={({item, index}) => <LandscapeItem landscape={item} />}
          keyExtractor={item => item.capital}
          ListFooterComponent={() => (
            <Text style={styles.source}>Nguồn: Internet</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Landscape;
