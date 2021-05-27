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

  panel: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: '#fff',
    height: '100%',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#fff',
    // shadowColor: '#333333',
    // shadowOffset: {width: -1, height: -12},
    // shadowRadius: 12,
    // shadowOpacity: 0.4,
    // elevation: 10,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
  },
  sheetDivider: {
    backgroundColor: 'red',
    marginVertical: 10,
    marginHorizontal: 50,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    paddingTop: 10,
    fontSize: 27,
    lineHeight: 25,
  },
  panelSubtitle: {
    fontSize: 16,
    color: 'gray',
    lineHeight: 25,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#f15454',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
