import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {windowWidth} from '../../Utils/Dimention';
import Icon from 'react-native-vector-icons/FontAwesome';

const Post = props => {
  const navigation = useNavigation();
  const post = props.post;
  const width = windowWidth;
  return (
    <Pressable
      onPress={() => navigation.navigate('Detailed Post', {post: post})}
      style={[styles.container, {width: width - 70}]}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={{uri: post.images[0]}} />
        <View style={styles.detailContainer}>
          <Text style={styles.rate}>
            5 <Icon name="star" size={16} color={'#f15454'} />
          </Text>
          <Text style={styles.name} numberOfLines={2}>
            {post.name}
          </Text>
          <Text numberOfLines={1} style={styles.openTime}>
            {post.openTime}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: 'transparent',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  detailContainer: {
    marginLeft: 10,
    marginRight: 5,
    flexDirection: 'column',
    flex: 1,
    marginVertical: 5,
  },
  image: {
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  rate: {
    fontSize: 18,
  },
  name: {
    lineHeight: 25,
    fontSize: 18,
  },
  openTime: {
    fontSize: 18,
  },
});

export default Post;
