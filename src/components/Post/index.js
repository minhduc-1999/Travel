import React from 'react';
import {Text, Image, Pressable, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Post = props => {
  const post = props.post;
  const navigation = useNavigation();
  return (
    <Pressable
      // onPress={() => navigation.navigate('Detailed Post', {postId: post.id})}
      style={styles.container}>
      <Image style={styles.image} source={{uri: post.images[0]}} />

      <Text style={styles.name} numberOfLines={2}>
        {post.name} - 5 <Icon name="star" size={25} color={'#ebe707'} />
      </Text>
      <View style={styles.tagContainer}>
        {post.tags
          ? post.tags.map(tag => <Text style={styles.tag}>{tag}</Text>)
          : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  name: {
    fontSize: 25,
    lineHeight: 26,
    fontWeight: '700',
    marginVertical: 10,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#696863',
    color: '#fff',
    borderRadius: 10,
    fontSize: 16,
  },
});

export default Post;
