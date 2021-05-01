import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '96%',
    height: 300,
    borderRadius: 20,
    margin: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  imageGroup: {
    height: '70%',
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
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    width: '70%'
  },
});

export default styles;
