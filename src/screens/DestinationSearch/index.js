import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View, TextInput, FlatList} from 'react-native';
import styles from './styles';
import searchData from '../../../assets/data/search';
import SuggestionRow from './SuggestionRow';

const DestinationSearchScreen = () => {
  const [inputText, setInputText] = useState('');
  console.log('destination Search screen render');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
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
        renderItem={({item}) => <SuggestionRow item={item} />}
      />
    </SafeAreaView>
  );
};

export default DestinationSearchScreen;
