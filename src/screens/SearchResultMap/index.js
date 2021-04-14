import React from 'react'
import { View, Text } from 'react-native';
import styles from './styles';
import PostCarousel from '../../components/PostCarouselItem';
import places from '../../../assets/data/feed';

const SearchResultMap = () => {
    return (
        <View style={styles.container}>
            {/* Map here */}
            <Text>Map Result</Text>

            <View style={styles.carouselList}>
                <PostCarousel post={places[0]} />
            </View>
        </View>
    )
}

export default SearchResultMap;
