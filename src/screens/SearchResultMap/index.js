import React from 'react'
import { View, Text, FlatList, useWindowDimensions } from 'react-native';
import styles from './styles';
import PostCarousel from '../../components/PostCarouselItem';
import places from '../../../assets/data/feed';


const SearchResultMap = () => {
    const itemWidth = useWindowDimensions().width;
    return (
        <View style={styles.container}>
            {/* Map here */}
            <Text>Map Result</Text>

            <View style={styles.carouselList}>
                <FlatList 
                data={places}
                renderItem={({item}) => <PostCarousel post={item}/>}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={itemWidth - 40}
                snapToAlignment={'center'}
                decelerationRate={'fast'}
                pagingEnabled={true}
                />
            </View>
        </View>
    )
}

export default SearchResultMap;
