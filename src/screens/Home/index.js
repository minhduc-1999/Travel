import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import styles from './styles';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import Tile from '../../components/Tile';
import {DbContext} from '../../Services/DbProvider';
import {windowWidth, windowHeight} from '../../Utils/Dimention';
import {
  AnimatedPressable,
  AnimatedStatusBar,
} from '../../components/CustomAnimated';
// const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
// const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HomeScreen = ({navigation}) => {
  const [tags, setTags] = useState([]);
  const {loadTags} = React.useContext(DbContext);
  useEffect(() => {
    loadTags()
      .then(res => setTags(res))
      .catch(console.error);
  }, []);
  const [barStyle, setBarStyle] = React.useState(true);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const headerColor = scrollY.interpolate({
    inputRange: [0, (windowHeight * 20) / 100],
    outputRange: ['#00000000', '#ffffff'],
    extrapolate: 'clamp',
  });
  const handleScroll = event => {
    const {y} = event.nativeEvent.contentOffset;
    if (y <= 70) setBarStyle(true);
    else setBarStyle(false);
  };
  console.log('Home screen render');
  return (
    <SafeAreaView>
      <AnimatedStatusBar
        translucent
        backgroundColor="transparent"
        barStyle={barStyle ? 'light-content' : 'dark-content'}
      />
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: headerColor,
            borderBottomColor: scrollY.interpolate({
              inputRange: [0, (windowHeight * 20) / 100],
              outputRange: ['#00000000', 'silver'],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <AnimatedPressable
          style={[
            styles.searchButton,
            {
              backgroundColor: scrollY.interpolate({
                inputRange: [0, (windowHeight * 20) / 100],
                outputRange: ['#fff', '#b5b5b5'],
                extrapolate: 'clamp',
              }),
            },
          ]}
          onPress={() => navigation.navigate('Destination Search')}>
          <Fonawesome name={'search'} color={'#f15454'} size={16} />
          <Text style={styles.searchButtonText}>Where are you going?</Text>
        </AnimatedPressable>
      </Animated.View>
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
        <ImageBackground
          // source={require('../../../assets/images/wallpaper.jpg')}
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fbackground%2Fhhrhrbb.png?alt=media&token=cbebeb95-a25e-4d16-971d-73feb9ad55ba',
          }}
          style={styles.image}>
          <Text style={styles.title}>Go Near</Text>
          <Pressable
            style={styles.button}
            onPress={() => console.warn(windowWidth)}>
            <Text style={styles.buttonText}>Explore nearby stays</Text>
          </Pressable>
        </ImageBackground>
        <View>
          <Text style={styles.proposedTitle}>Most Popular</Text>
          <View style={{marginVertical: 10}}>
            <FlatList
              data={tags}
              renderItem={({item, index}) => (
                <Tile
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
                  onPress={() => console.warn(item.name)}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
