import {StyleSheet} from 'react-native';
import {windowWidth, windowHeight} from '../../Utils/Dimention';

const styles = StyleSheet.create({
  introduction: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'justify',
    lineHeight: 25,
  },
  image: {
    borderRadius: 10,
    width: windowWidth - 40,
    height: undefined,
    aspectRatio: 4 / 3,
  },
  infoContainer: {
    marginBottom: 10,
  },
  index: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: 'bold',
  },
  value: {
    textAlign: 'justify',
    fontSize: 18,
    lineHeight: 25,
  },
});

export default styles;
