import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  Pressable,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import Tile from '../../components/Tile';
import {DbContext} from '../../Services/DbProvider';
import {windowWidth, windowHeight} from '../../Utils/Dimention';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  interpolateColor,
  withSpring,
} from 'react-native-reanimated';
import CustomHeader from '../../components/CustomHeader';
import ContentLoader, {Rect} from 'react-content-loader/native';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const {loadTags} = React.useContext(DbContext);

  const scrollY = useSharedValue(0);

  const scrollHander = useAnimatedScrollHandler(event => {
    const {y} = event.contentOffset;
    scrollY.value = y;
  });

  useEffect(() => {
    let mounted = true;
    loadTags()
      .then(res => {
        if (mounted) {
          setTags(res);
          setLoading(false);
        }
      })
      .catch(console.error);
    return function clean() {
      mounted = false;
    };
  }, []);

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, (windowHeight * 20) / 100],
        [0, 1],
      ),
    };
  });

  const headerShadowAnim = useAnimatedStyle(() => {
    return {
      shadowOpacity: interpolate(
        scrollY.value,
        [0, (windowHeight * 20) / 100],
        [0, 1],
      ),
    };
  });

  const btnAnimated = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, (windowHeight * 20) / 100],
        ['rgb(255, 255, 255)', 'rgb(240,240,240)'],
        'RGB',
      ),
      shadowOpacity: interpolate(
        scrollY.value,
        [0, (windowHeight * 20) / 100],
        [1, 0],
      ),
      elevation: interpolate(
        scrollY.value,
        [0, (windowHeight * 20) / 100],
        [10, 0],
      ),
    };
  });

  console.log('Home screen render');
  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <CustomHeader
        height={windowHeight * 0.16}
        style={{borderBottomWidth: 2, borderBottomColor: '#e6e6e6'}}
        shadowAnim={headerShadowAnim}
        bgAnimated={headerStyle}>
        <Animated.View style={[styles.searchButton, btnAnimated]}>
          <Pressable
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Destination Search', {})}>
            <Fonawesome name={'search'} color={'#f15454'} size={16} />
            <Text style={styles.searchButtonText}>Where are you going?</Text>
          </Pressable>
        </Animated.View>
      </CustomHeader>

      <Animated.ScrollView
        onScroll={scrollHander}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fbackground%2Fhhrhrbb.png?alt=media&token=cbebeb95-a25e-4d16-971d-73feb9ad55ba',
          }}
          style={styles.image}>
          <Text style={styles.title}>Go Near</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Comment')}>
            <Text style={styles.buttonText}>Make your plan</Text>
          </Pressable>
        </ImageBackground>
        <View>
          <Text style={styles.proposedTitle}>Most Popular</Text>
          <View style={{marginVertical: 10}}>
            {loading ? (
              <FlatList
                scrollEnabled={false}
                data={[1, 2]}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      padding: 10,
                      width: windowWidth * 0.7,
                      height: windowWidth * 0.7,
                    }}>
                    <ContentLoader
                      backgroundColor="#dcdcdc"
                      foregroundColor="#f5f5f5"
                      speed={1}
                      viewBox={`0 0 ${windowWidth * 0.7} ${windowWidth * 0.7}`}>
                      <Rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width={windowWidth * 0.7}
                        height={windowWidth * 0.7}
                      />
                    </ContentLoader>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <FlatList
                data={tags}
                renderItem={({item, index}) => (
                  <Tile
                    key={item.refId}
                    width={(windowWidth * 70) / 100}
                    height={(windowWidth * 70) / 100}
                    containerStyle={{
                      marginHorizontal: 15,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                    opacity={1}
                    // activeOpacity={0.5}
                    // featured
                    imageSrc={item.coverUrl}
                    title={item.name}
                    titleStyle={{
                      fontSize: 36,
                      fontWeight: 'bold',
                      color: '#fff',
                    }}
                    onPress={() =>
                      navigation.navigate('List by Tag', {
                        tags: tags,
                        selectedTagIndex: index,
                      })
                    }
                  />
                )}
                keyExtractor={item => item.refId.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
