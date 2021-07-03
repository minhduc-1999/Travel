import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LandscapeItem = ({landscape}) => {
  return (
    <View>
      <Text style={styles.introduction}>{landscape.introduction}</Text>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <View style={{justifyContent: 'center'}}>
          <FontAwesome name="chart-area" size={18} />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.index}> Diện tích: </Text>
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
        <FontAwesome name="border-style" size={18} />
        <Text style={styles.index}>{'  '}Biên giới: </Text>
        <Text style={styles.value}>{landscape.border}</Text>
      </Text>
      <Text style={styles.infoContainer}>
        <FontAwesome name="user-friends" size={16} />
        <Text style={styles.index}> Dân số: </Text>
        <Text style={styles.value}>{landscape.population}</Text>
      </Text>
      <Text style={styles.infoContainer}>
        <FontAwesome name="city" size={16} />
        <Text style={styles.index}> Thủ đô: </Text>
        <Text style={styles.value}>{landscape.capital}</Text>
      </Text>
      <Text style={styles.infoContainer}>
        <Ionicons name="language" size={18} />
        <Text style={styles.index}> Ngôn ngữ: </Text>
        <Text style={styles.value}>{landscape.language}</Text>
      </Text>
      <Image style={styles.image} source={{uri: landscape.mapImage}} />
    </View>
  );
};

export default LandscapeItem;
