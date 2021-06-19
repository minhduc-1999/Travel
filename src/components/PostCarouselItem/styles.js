import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: 'transparent',
  },
  innerContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  bedrooms: {
    marginVertical: 5,
    color: '#5b5b5b',
  },
  description: {
    fontSize: 16,
  },
  prices: {
    fontSize: 16,
  },
  newPrice: {
    fontWeight: 'bold',
  },
  detailContainer: {
    marginLeft: 10,
  },
});

export default styles;
