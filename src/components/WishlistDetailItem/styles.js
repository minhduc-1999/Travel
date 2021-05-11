import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
  },
});

export default styles;
