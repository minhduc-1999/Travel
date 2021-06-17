import React from 'react';
import {Text, StyleSheet, View, ImageBackground, Animated} from 'react-native';
import {windowWidth} from '../../Utils/Dimention';

const index = ({images, style, initIndex}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const handleScroll = event => {
    //TODO
  };
  console.log('Swiper render');
  return (
    <View style={[styles.scrollContainer, style]}>
      <Animated.ScrollView
        horizontal={true}
        style={styles.scrollViewStyle}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false, listener: event => handleScroll(event)},
        )}
        scrollEventThrottle={10}>
        {images.map((image, imageIndex) => {
          return (
            <View
              style={{width: windowWidth, height: style.height}}
              key={imageIndex}>
              <ImageBackground
                source={{uri: image}}
                style={styles.card}></ImageBackground>
            </View>
          );
        })}
      </Animated.ScrollView>
      <View style={styles.indicatorContainer}>
        {images.map((image, imageIndex) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          const backgroundColor = scrollX.interpolate({
            inputRange: [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1),
            ],
            outputRange: ['#C0C0C0', '#f15454', '#C0C0C0'],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={imageIndex}
              style={[styles.normalDot, {width, backgroundColor}]}
            />
          );
        })}
      </View>
      {/* <View style={styles.textContainer}>
        <Text style={styles.infoText}>
          {1} / {images.length}
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewStyle: {
    flex: 1,
  },
  card: {
    flex: 1,
    // marginVertical: 4,
    // marginHorizontal: 16,
    // borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
    position: 'absolute',
    bottom: 15,
    right: 20,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
  },
});

export default index;
