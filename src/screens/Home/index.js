import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import Tile from '../../components/Tile';

import tags from '../../../assets/data/tags';
import {windowWidth} from '../../Utils/Dimention';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView>
      <Pressable
        style={styles.searchButton}
        onPress={() => navigation.navigate('Destination Search')}>
        <Fonawesome name={'search'} color={'#f15454'} size={16} />
        <Text style={styles.searchButtonText}>Where are you going?</Text>
      </Pressable>
      <ImageBackground
        source={require('../../../assets/images/wallpaper.jpg')}
        // source={{
        //   uri:
        //     'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fbackground%2Fhhrhrbb.png?alt=media&token=cbebeb95-a25e-4d16-971d-73feb9ad55ba',
        // }}
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
            renderItem={({item}) => (
              <Tile
                key={item.id}
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
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
