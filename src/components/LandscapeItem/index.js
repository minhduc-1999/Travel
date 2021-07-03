import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const LandscapeItem = ({landscape}) => {
  return (
    <View>
      <Text style={styles.title}>{landscape.name}</Text>
      <Image style={styles.image} source={{uri: landscape.image}} />
      <Text style={styles.description}>{landscape.desciption}</Text>
    </View>
  );
};

export default LandscapeItem;
