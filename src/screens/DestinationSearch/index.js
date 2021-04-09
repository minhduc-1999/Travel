import React, {useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import styles from './styles';
import searchData from '../../../assets/data/search';
import Entypo from 'react-native-vector-icons/Entypo';
const DestinationSearchScreen = () => {
  const [inputText, setInputText] = useState('');
  return (
    <View style={styles.container}>
      {/* input component */}
      <TextInput
        style={styles.textInput}
        placeholder={'Where are you going?'}
        value={inputText}
        onChangeText={setInputText}
      />
      {/* List of des */}
      <FlatList
        data={searchData}
        renderItem={({item}) => 
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                <Entypo name={'location-pin'} size={25}/>
            </View>
            <Text style={styles.locationText}>{item.description}</Text>
        </View>}
      />
    </View>
  );
};

export default DestinationSearchScreen;
