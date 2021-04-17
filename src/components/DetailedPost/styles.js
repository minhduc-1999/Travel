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
        fontSize: 20,
        lineHeight: 26
    },
    prices: {
        fontSize: 20
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
    },
    longDescription: {
        lineHeight: 24,
        fontSize: 20,
        marginVertical: 10
    }
});

export default styles;