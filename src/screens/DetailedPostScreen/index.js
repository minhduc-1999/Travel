import React from 'react'
import { ScrollView } from 'react-native'
import DetailedPost from '../../components/DetailedPost';
import places from '../../../assets/data/feed'
const DetailedPostScreen = ({route}) => {
    const {postId} = route.params;
    const post = places.find(place => place.id === postId);
    return (
        <ScrollView>
            <DetailedPost post={post} />
        </ScrollView>
    )
}

export default DetailedPostScreen;

