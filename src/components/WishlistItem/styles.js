import {StyleSheet} from 'react-native';
import {windowWidth} from '../../Utils/Dimention';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    height: 270,
    width: windowWidth - 40,
    borderRadius: 20,
    marginTop: 0,
    marginBottom: 30,
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
    width: windowWidth - 40,
    flexDirection: 'column',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  imageSingle: {
    width: windowWidth - 40,
    height: '100%',
    resizeMode: 'cover',
  },
  mainImage: {
    width: (windowWidth - 40) * 0.55,
    height: '100%',
    marginRight: 2,
    resizeMode: 'cover',
  },
  image1: {
    width: '100%',
    height: '100%',
    marginBottom: 2,
    resizeMode: 'cover',
  },
  image2: {
    width: '100%',
    height: '100%',
    marginTop: 1,
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
