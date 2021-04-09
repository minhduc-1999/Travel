import React from 'react'
import {View, FlatList} from 'react-native';
import feed from '../../../assets/data/feed';
import Post from '../../components/Post';

const SearchResultScreen = (props) => {
    console.log(feed);
    return (
        <View>
            <FlatList
                data={feed}
                renderItem={({item}) => <Post post={item}/>}
            />
        </View>
    );
};
export default SearchResultScreen;
