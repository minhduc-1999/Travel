import React from 'react';
import {View, ImageBackground, Text, Pressable} from 'react-native';
import styles from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {AuthContext} from '../../navigation/AuthProvider';
import {useContext} from 'react/cjs/react.development';
// import {useNavigation} from '@react-navigation/native';
const HomeScreen = ({navigation}) => {
  // const navigation = useNavigation();
  const {logout} = useContext(AuthContext);
  return (
    <View>
      <Pressable
        style={styles.searchButton}
        onPress={() => navigation.navigate('Destination Search')}>
        <Fontisto name={'search'} color={'#f15454'} size={16} />
        <Text style={styles.searchButtonText}>Where are you going?</Text>
      </Pressable>
      <ImageBackground
        source={require('../../../assets/images/wallpaper.jpg')}
        style={styles.image}>
        <Text style={styles.title}>Go Near</Text>
        <Pressable style={styles.button} onPress={() => logout()}>
          <Text style={styles.buttonText}>Explore nearby stays</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
