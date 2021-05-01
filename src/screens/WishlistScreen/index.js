import React from 'react'
import { ScrollView } from 'react-native'
import WishlistItem from '../../components/WishlistItem';
import places from '../../../assets/data/feed';
import savedList from '../../../assets/data/saved';

const WishlistScreen = () => {
    return (
        <ScrollView>
            {/* saved list */}
            <WishlistItem item={savedList[0]}/>
        </ScrollView>
    );
};

export default WishlistScreen;
