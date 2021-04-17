import React from 'react';
import {View, Text} from 'react-native';

const CustomMarker = props => {
  const {price, onPress, isSelected} = props;
  return (
    <View
      style={{
        backgroundColor: isSelected ? 'black' : 'white',
      }}>
      <Text
        style={{
          color: isSelected ? 'white' : 'black',
          fontWeight: 'bold',
        }}
        onPress={onPress}>
        {price}
      </Text>
    </View>
  );
};

export default CustomMarker;
