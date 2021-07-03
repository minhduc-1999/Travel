import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {DbContext} from '../../Services/DbProvider';
import {windowWidth} from '../../Utils/Dimention';

const WishlistItem = ({item}) => {
  const navigation = useNavigation();
  const {loadDestinationsByRefId} = useContext(DbContext);
  const [des, setDes] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log('reload wl item', item.id);
    let mounted = true;
    loadDestinationsByRefId(item.destinations)
      .then(res => {
        if (mounted) {
          setDes(res);
          const img = res.map(data => data.images[0]);
          setImages(img);
        }
      })
      .catch(error => console.error(error));
    return function () {
      mounted = false;
    };
  }, []);

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('SavedDetail', {places: des, wishlist: item})
      }>
      {des.length < 3 ? (
        <View style={styles.imageGroup}>
          <Image style={styles.imageSingle} source={{uri: images[0]}} />
        </View>
      ) : (
        <View style={styles.imageGroup}>
          <Image style={styles.mainImage} source={{uri: images[0]}} />
          <View
            style={{
              width: (windowWidth - 40) * 0.45,
              height: '100%',
              flexDirection: 'column',
            }}>
            <View style={{width: '100%', height: '50%', overflow: 'hidden'}}>
              <Image style={styles.image1} source={{uri: images[1]}} />
            </View>
            <View
              style={{width: '100%', height: 1.5, backgroundColor: 'white'}}
            />
            <View style={{width: '100%', height: '50%', overflow: 'hidden'}}>
              <Image style={styles.image2} source={{uri: images[2]}} />
            </View>
          </View>
        </View>
      )}
      <Text numberOfLines={2} style={styles.name}>
        {item.name}
      </Text>
    </Pressable>
  );
};

export default WishlistItem;
