import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: 120
    },
    innerContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    image: {
        height: '100%',
        width: undefined,
        aspectRatio: 1,
        resizeMode: 'cover'
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
    newPrice: {
        fontWeight: 'bold',
    },
    detailContainer: {
        marginLeft: 10
    }
});

export default styles;