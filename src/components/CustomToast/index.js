import React from 'react';
import {View, Text} from 'react-native';
import {windowWidth} from '../../Utils/Dimention';

const toastConfig = {
  success: ({text1, props, ...rest}) => (
    <View
      style={{
        // height: 60,
        width: windowWidth - 80,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#ffff',
        overflow: 'hidden',
        shadowColor: '#f15454',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 20,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        {text1}
      </Text>
      {/* <Text>{props.guid}</Text> */}
    </View>
  ),
  error: () => {},
  info: ({text1, props, ...rest}) => (
    <View
      style={{
        height: 60,
        width: windowWidth - 40,
        marginLeft: 20,
        backgroundColor: 'pink',
      }}>
      <Text>{text1}</Text>
      <Text>{props.guid}</Text>
    </View>
  ),
  any_custom_type: () => {},
};

export default toastConfig;
