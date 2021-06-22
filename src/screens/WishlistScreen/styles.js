import {StyleSheet} from 'react-native';
import { windowHeight, windowWidth } from '../../Utils/Dimention';

const styles = StyleSheet.create({
    container: {

    },
    screenTitile: {
      fontSize: 30,
      margin: 30,
      marginLeft: 20,
      fontWeight: 'bold',
    },
    buttonAdd: {
      width: 60,
      height: 60,
      backgroundColor: '#f15454',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      marginLeft: windowWidth - 80,
      marginTop: windowHeight - 190,
      position: 'absolute',
      zIndex: 100,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
})

export default styles;