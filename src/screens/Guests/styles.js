import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%'
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
  },
  searchButton: {
    backgroundColor: '#f15454',
    alignItems: 'center',
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 40,
    borderRadius: 15
  }
});

export default styles;
