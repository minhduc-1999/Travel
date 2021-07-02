import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../../Utils/Dimention';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    height: 95,
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderBottomWidth: 1.5,
    width: '100%',
    alignItems: 'center',
    zIndex: 100,
  },
  searchButton: {
    backgroundColor: '#fff',
    height: 50,
    width: (windowWidth * 80) / 100,
    marginHorizontal: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  searchButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
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
    fontSize: 17,
    fontWeight: 'bold',
  },
  proposedTitle: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 20,
  },
  covidContainer: {
    borderWidth: 0.5,
    borderColor: '#000',
    margin: 15,
    borderRadius: 10,
    padding: 10,
  },
  covidTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  imageTitle: {
    width: 40,
    height: 40,
  },
  covidContent: {
    fontSize: 20,
    marginTop: 20,
    color: '#000',
  },
  sourceContainer: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 20,
  },
  sourceCovidTitle: {
    color: '#f15454',
  },
  sourceCovid: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    color: '#f15454',
  },
});

export default styles;
