import { StyleSheet } from 'react-native';
import { windowWidth } from '../../Utils/Dimention';

const styles = StyleSheet.create({
  container: {
    marginBottom: 135,
  },
  title: {
    fontSize: 30,
    marginLeft: 25,
    marginBottom: 25,
  },
  separator: {
    height: 3,
    marginHorizontal: 20,
  },
  menuButton: {
    position: 'absolute',
    marginTop: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: windowWidth - 50,
    backgroundColor: '#f2f2f2',
  },
});

export default styles;