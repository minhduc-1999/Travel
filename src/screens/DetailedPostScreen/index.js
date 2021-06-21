import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import DetailPost from '../../components/DetailedPost';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../components/CustomHeader';
import {windowHeight} from '../../Utils/Dimention';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DetailedPostScreen = ({route, navigation}) => {
  const scrollY = useSharedValue(0);
  const scrollHander = useAnimatedScrollHandler(event => {
    const {y} = event.contentOffset;
    scrollY.value = y;
  });
  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, windowHeight * 0.2], [0, 1]),
    };
  });

  const shadowAnimStyle = useAnimatedStyle(() => {
    return {
      shadowColor: interpolateColor(
        scrollY.value,
        [0, windowHeight * 0.2],
        ['rgb(255,255,255)', 'rbg(0,0,0)'],
        'RGB',
      ),
    };
  });

  const {post} = route.params;
  console.log('detail post screen render');

  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <CustomHeader
        height={windowHeight * 0.12}
        style={{borderBottomWidth: 2, borderBottomColor: '#e6e6e6'}}
        bgAnimated={headerStyle}>
        <View style={styles.header}>
          <Animated.View style={styles.section}>
            <AnimatedPressable
              style={[styles.smallBtn, shadowAnimStyle]}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="times" color="#000" size={16} />
            </AnimatedPressable>
          </Animated.View>
          <View
            style={[
              styles.section,
              {flex: 3, justifyContent: 'center'},
            ]}></View>
          <Animated.View style={styles.section}>
            <AnimatedPressable
              style={[styles.smallBtn, shadowAnimStyle]}
              onPress={() => {}}>
              <Icon name="heart" color="#000" size={16} />
            </AnimatedPressable>
          </Animated.View>
        </View>
      </CustomHeader>

      <Animated.ScrollView onScroll={scrollHander}>
        <DetailPost post={post} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  smallBtn: {
    // position: 'absolute',
    // top: 30,
    // left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.8,
    shadowRadius: 11.95,
    elevation: 18,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  // container: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   backgroundColor: 'transparent',
  //   width: '100%',
  //   height: 70,
  //   alignItems: 'center',
  //   zIndex: 100,
  // },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    // flex: 1,
    // marginTop: StatusBar.currentHeight,
  },
  section: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailedPostScreen;
