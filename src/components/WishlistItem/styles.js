import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: 'white',
    height: 300,
    borderRadius: 20,
    margin: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageGroup: {
    height: '65%',
    width: '100%',
    backgroundColor: 'lightblue',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  mainImage: {
    width: '60%',
    marginRight: 1,
    flexBasis: '100%',
    flexGrow: 2,
    resizeMode: 'cover',
  },
  image1: {
    width: '40%',
    flexGrow: 1,
    marginBottom: 1,
    flexBasis: '48%',
    resizeMode: 'cover',
  },
  image2: {
    width: '40%',
    flexGrow: 1,
    marginTop: 1,
    flexBasis: '48%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 26,
    fontWeight: 'normal',
    marginLeft: 20,
    width: '70%',
    height: '35%',
    textAlignVertical: 'center',
  },
});

export default styles;
