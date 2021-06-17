import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import DetailPost from '../../components/DetailedPost';
import Icon from 'react-native-vector-icons/FontAwesome';
// import CustomHeader from '../../components/CustomHeader';
import {windowHeight} from '../../Utils/Dimention';
// import Animated from 'react-native-reanimated';

const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
const DetailedPostScreen = ({route, navigation}) => {
  const [barStyle, setBarStyle] = React.useState('light-content');
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const headerColor = scrollY.interpolate({
    inputRange: [0, (windowHeight * 30) / 100],
    outputRange: ['#00000000', '#ffffffff'],
    extrapolate: 'clamp',
  });
  const {post} = route.params;
  console.log('detail post screen render');
  const handleScroll = event => {
    const {y} = event.nativeEvent.contentOffset;
    if (y >= (windowHeight * 20) / 100) setBarStyle('dark-content');
    else setBarStyle('light-content');
  };
  return (
    <SafeAreaView>
      <AnimatedStatusBar
        translucent
        backgroundColor={headerColor}
        barStyle={barStyle}
      />
      <View style={[styles.container]}>
        <Animated.View
          style={[
            styles.header,
            {
              backgroundColor: headerColor,
              borderBottomColor: scrollY.interpolate({
                inputRange: [0, (windowHeight * 30) / 100],
                outputRange: ['#00000000', 'silver'],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <View style={[styles.section]}>
            <Pressable
              style={styles.back}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="times" color="#000" size={16} />
            </Pressable>
          </View>
          <View
            style={[
              styles.section,
              {flex: 3, justifyContent: 'center'},
            ]}></View>
          <View style={[styles.section]}>
            <Pressable style={styles.back} onPress={() => {}}>
              <Icon name="heart" color="#000" size={16} />
            </Pressable>
          </View>
        </Animated.View>
      </View>

      <ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: false, listener: event => handleScroll(event)},
        )}>
        <DetailPost post={post} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  back: {
    // position: 'absolute',
    // top: 30,
    // left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 9,
    // },
    // shadowOpacity: 0.48,
    // shadowRadius: 11.95,
    // elevation: 18,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    width: '100%',
    height: 70,
    alignItems: 'center',
    zIndex: 100,
  },
  header: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  section: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailedPostScreen;
