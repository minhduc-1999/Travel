import React from 'react'
import { View, ImageBackground, Text, Pressable } from 'react-native'
import styles from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
const HomeScreen = (props) => {
    return (
        <View>
            <Pressable
                style={styles.searchButton}
                onPress={() => console.warn('Search btn clicked')}>
                <Fontisto name={'search'} color={'#f15454'} size={16}/>
                <Text style={styles.searchButtonText}>Where are you going?</Text>
            </Pressable>
            <ImageBackground
                source={require('../../../assets/images/wallpaper.jpg')}
                style={styles.image}>
                <Text style={styles.title}>Go Near</Text>
                <Pressable
                    style={styles.button}
                    onPress={() => console.warn('btn clicked')}>
                    <Text style={styles.buttonText}>Explore nearby stays</Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
};

export default HomeScreen;
