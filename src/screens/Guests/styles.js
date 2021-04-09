import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {

  },
  row: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginHorizontal: 20
  },
  buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  button: {
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
