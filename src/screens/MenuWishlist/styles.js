import {StyleSheet} from 'react-native';
import {windowWidth} from '../../Utils/Dimention';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputContainer: {
    height: 60,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    marginTop: 30,
  },
  nameInput: {
    height: 40,
    marginLeft: 8,
    fontSize: 18,
  },
  deleteButton: {
    marginTop: 20,
    width: windowWidth / 2,
  },
  deleteText: {
    fontSize: 20,
    color: 'red',
    textDecorationLine: 'underline',
    width: '100%',
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botButton: {
    width: windowWidth / 5,
    height: 50,
    justifyContent: 'center',
  },
});

export default styles;
