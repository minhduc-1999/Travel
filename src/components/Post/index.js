import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles.js'
const Post = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image}
                source={require('../../../assets/images/wallpaper.jpg')}
            />
            <Text style={styles.bedrooms}>1 bedroome - 1 bathroom</Text>
            <Text style={styles.description} numberOfLines={2}>des des des des des desdes des desdes des desdes des desdes des desdes des desdes des desdes des des
            des des desdes des desdes des desdes des desdes des desdes des des
            des des desdes des desdes des desdes des desdes des desdes des desdes des des</Text>
            <Text style={styles.prices}>
                <Text style={styles.oldPrice}>$40 </Text>
                <Text style={styles.newPrice}> $50 </Text>
                 / night
            </Text>
            <Text style={styles.totalPrice}>$230 total</Text>
        </View>
    )
}

export default Post;
