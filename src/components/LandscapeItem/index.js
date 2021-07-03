import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const LandscapeItem = ({landscape}) => {
  return (
    <View>
      <Text style={styles.introduction}>{landscape.introduction}</Text>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.index}>Diện tích: </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
          <Text style={{fontSize: 18, lineHeight: 30}}>{landscape.square}</Text>
          <Text style={{fontSize: 12, lineHeight: 18}}>2</Text>
        </View>
      </View>
      <Text style={styles.infoContainer}>
        <Text style={styles.index}>Biên giới: </Text>
        <Text style={styles.value}>{landscape.border}</Text>
      </Text>
      <Text style={styles.infoContainer}>
        <Text style={styles.index}>Dân số: </Text>
        <Text style={styles.value}>{landscape.population}</Text>
      </Text>
      <Text style={styles.infoContainer}>
        <Text style={styles.index}>Thủ đô: </Text>
        <Text style={styles.value}>{landscape.capital}</Text>
      </Text>
      <Text style={styles.infoContainer}>
        <Text style={styles.index}>Ngôn ngữ: </Text>
        <Text style={styles.value}>{landscape.language}</Text>
      </Text>
      <Image style={styles.image} source={{uri: landscape.mapImage}} />
    </View>
  );
};

export default LandscapeItem;
