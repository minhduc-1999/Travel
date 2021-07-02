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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  topMain: {
    width: '100%',
    height: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 1,
  },
  main: {
    width: '100%',
    height: windowHeight - 80 - StatusBar.currentHeight,
    // marginTop: 80,
    backgroundColor: 'transparent',
    paddingBottom: 40,
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
  commentList: {
    width: windowWidth,
  },
  commentInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 'auto',
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopColor: 'silver',
    borderTopWidth: 0.2,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 8,
  },
  input: {
    backgroundColor: 'rgb(240,240,240)',
    width: windowWidth - 74,
    borderRadius: 24,
    height: 'auto',
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 16,
    marginRight: 10,
  },
  send: {
    justifyContent: 'center',
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

export const diaStyle = StyleSheet.create({
  dialog: {
    borderRadius: 10,
  },
  container: {
    alignItems: 'center',
  },
  dialogTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistInput: {
    height: 40,
    marginLeft: 8,
    fontSize: 18,
  },
  createButton: {
    backgroundColor: '#000',
    marginTop: 20,
    borderRadius: 10,
    height: 50,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exit: {
    position: 'absolute',
    width: 30,
    height: 30,
    marginTop: 5,
    top: 0,
    left: 0,
  },
});

export default styles;
