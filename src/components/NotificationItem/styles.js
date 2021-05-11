import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconCircle: {
    height: 60,
    width: 60,
    marginVertical: 10,
    borderRadius: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 30,
  },
  text: {
    height: '100%',
    width: '70%',
    marginLeft: 10,
  },
  content: {
    marginTop: 5,
    fontSize: 18,
  },
  time: {
    color: 'lightslategrey',
    position: 'absolute',
    bottom: 10,
  },
});

export default styles;