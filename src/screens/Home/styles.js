import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  image: {
    top: 0,
    left: 0,
    width: '100%',
    height: 500,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 80,
    fontWeight: 'bold',
    width: '70%',
    color: 'white',
    marginLeft: 25,
    lineHeight: 80,
  },
  button: {
    marginTop: 25,
    backgroundColor: '#fff',
    width: 200,
    marginLeft: 25,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#fff',
    height: 50,
    width: Dimensions.get('screen').width - 60,
    marginHorizontal: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 25,
    left: 0,
    zIndex: 100,
    elevation: Platform.OS === 'android' ? 50 : 0,
  },
  searchButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  proposedTitle: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 20,
  },
});

export default styles;
