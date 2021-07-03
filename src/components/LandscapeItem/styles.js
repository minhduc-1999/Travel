import {StyleSheet} from 'react-native';
import {windowWidth, windowHeight} from '../../Utils/Dimention';

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    marginTop: 30,
  },
  image: {
    borderRadius: 10,
    width: windowWidth - 40,
    height: windowHeight / 2.8,
  },
  description: {
    marginTop: 10,
    textAlign: 'justify',
    fontSize: 18,
    lineHeight: 25,
  },
});

export default styles;
