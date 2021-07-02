import {StyleSheet} from 'react-native';
import {windowHeight} from '../../Utils/Dimention';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    height: '100%',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    paddingTop: 0,
    backgroundColor: 'rgba(65, 209, 222, 0.6)',
    height: '100%',
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginTop: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#f15454',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    // fontFamily: 'Lato-Regular',
  },
});

export default styles;
