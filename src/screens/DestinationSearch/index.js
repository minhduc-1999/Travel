import React, {useState} from 'react';
import {View, TextInput, FlatList} from 'react-native';
import styles from './styles';
import searchData from '../../../assets/data/search';
import SuggestionRow from './SuggestionRow';

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
        renderItem={({item}) => <SuggestionRow item={item}/>}
      />
    </View>
  );
};

export default DestinationSearchScreen;
