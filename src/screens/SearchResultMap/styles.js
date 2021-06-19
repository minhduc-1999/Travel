import {StyleSheet} from 'react-native';
import {windowWidth} from '../../Utils/Dimention';
import {StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  searchButton: {
    backgroundColor: '#fff',
    height: 50,
    width: windowWidth - 60,
    marginHorizontal: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 50,
    elevation: 50,
  },
  searchButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: 200,
  },
  carouselList: {
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    paddingTop: 15,
    width: '100%',
    height: 70,
    alignItems: 'center',
    borderBottomColor: '#00000040',
    borderBottomWidth: 1,
  },
  thumb: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
  },
  meta: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: '600',
    textAlign: 'center',
    fontWeight: '600',
    alignSelf: 'center',
  },
  panel: {
    marginTop: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: '100%',
    alignItems: 'center',
  },
});

export default styles;
