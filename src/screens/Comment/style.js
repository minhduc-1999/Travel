import {StyleSheet, StatusBar} from 'react-native';
import {windowHeight, windowWidth} from '../../Utils/Dimention';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    zIndex: 100,
    height: 80,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  topMain: {
    width: '100%',
    height: 82,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    // elevation: 2,
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
  },
  main: {
    width: '100%',
    height: windowHeight - 80 - StatusBar.currentHeight,
    // marginTop: 80,
    backgroundColor: 'transparent',
  },
  control: {
    overflow: 'hidden',
  },
  option: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const cmtStyle = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: windowWidth,
    height: 'auto',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
});

export default styles;
