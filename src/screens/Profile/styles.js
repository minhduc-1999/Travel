import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  userImage: {
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    padding: 10,
    paddingBottom: 30,
  },
  field: {
    fontSize: 18,
    color: '#5b5b5b',
    lineHeight: 26,
  },
  fieldValue: {
    fontSize: 22,
    color: 'black',
    lineHeight: 26,
    padding: 5,
    paddingLeft: 0,
  },
  divider: {
    marginVertical: 8,
  },
  badgeContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    position: 'absolute',
    top: 115,
    right: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeStyle: {
    width: 34,
    height: 34,
    backgroundColor: '#cfccc6',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    marginRight: 20,
  },
});

export default styles;
