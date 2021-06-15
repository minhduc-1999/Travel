import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const index = props => {
  const {
    onPress,
    imageSrc,
    title,
    titleStyle,
    width,
    height,
    containerStyle,
    opacity,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[containerStyle, {width: width, height: height}]}>
      <ImageBackground
        source={{uri: imageSrc}}
        // source={require('../../../assets/images/history.jpg')}
        style={[styles.image, {opacity: opacity}]}>
        <Text
          style={[
            titleStyle,
            {
              textShadowOffset: {width: 3, height: 3},
              textShadowRadius: 10,
              textShadowColor: '#000',
            },
          ]}>
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default index;
