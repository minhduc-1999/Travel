import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    backgroundColor: '#fff',
    height: '100%',
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    fontSize: 20,
    marginVertical: 20,
    height: 50,
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 25,
  },
  searchResult: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
  },
  iconContainer: {
    backgroundColor: '#e7e7e7',
    padding: 7,
    borderRadius: 10,
    marginRight: 15,
  },
  locationText: {
    fontSize: 20,
    maxWidth: 280,
  },
});

export default styles;
