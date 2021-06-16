import React from 'react';
import {View} from 'react-native';

const Divider = props => (
  <View
    style={[
      {
        borderTopColor: '#ECECEC',
        marginVertical: 20,
        borderTopWidth: 1,
      },
      props.style,
    ]}></View>
);

export default Divider;
