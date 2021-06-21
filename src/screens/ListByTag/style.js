import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
    marginTop: 70,
  },
  header: {
    width: '100%',
    zIndex: 100,
    backgroundColor: '#fff',
    height: 70,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  listContainer: {
    width: '100%',
    height: '100%',
    paddingTop: 70,
  },
  tagSelector: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 70,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  tagItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: 'grey',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
});

export default styles;
