import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 3 / 2,
        resizeMode: 'cover',
        borderRadius: 15
    },
    bedrooms: {
        marginVertical: 10,
        color: '#5b5b5b'
    },
    description: {
        fontSize: 18,
        lineHeight: 26
    },
    prices: {
        fontSize: 18
    },
    oldPrice: {
        color: '#5b5b5b',
        textDecorationLine: 'line-through'
    },
    newPrice: {
        fontWeight: 'bold',
    },
    totalPrice: {
        textDecorationLine: 'underline'
    }

});

export default styles;