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
    marginLeft: windowWidth - 40,
    backgroundColor: '#ffff',
  },
});

export default styles;