import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, View, TextInput, FlatList} from 'react-native';
import styles from './styles';
import SuggestionRow from './SuggestionRow';
import SECRET from '../../../secret';
import {SEARCH_OPTION} from '../../../map_config';
import {encodeQueryData} from '../../Utils/Dimention';
import {Search2} from '../../../assets/data/search';

const DestinationSearchScreen = ({navigation, route}) => {
  const [inputText, setInputText] = useState('');
  const [addressArr, setAddressArr] = useState([]);

  useEffect(() => {
    if (inputText) {
      const params = {
        countryRegion: SEARCH_OPTION.CountryRegion,
        adminDistrict: inputText,
        locality: inputText,
        includeNeighborhood: 1,
        maxResults: SEARCH_OPTION.SearchMaxResult,
        key: SECRET.KEY,
      };
      const query = encodeQueryData(params);
      const url = `http://dev.virtualearth.net/REST/v1/Locations?${query}`;
      console.log(url);
      if (Search2.statusCode === 200) {
        const a = Search2.resourceSets[0].resources.map(src => {
          return {
            name: src.name,
            coordinates: {
              lat: src.point.coordinates[0],
              long: src.point.coordinates[1],
            },
            address: src.address,
            confidence: src.confidence,
          };
        });
        setAddressArr(a);
      }
    }
  }, [inputText]);
  console.log('destination Search screen render');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      {/* input component */}
      <TextInput
        autoFocus={true}
        numberOfLines={1}
        style={styles.textInput}
        placeholder={'Where are you going?'}
        defaultValue={
          route.params.oldLocation ? route.params.oldLocation.name : ''
        }
        // onChangeText={setInputText}
        clearTextOnFocus={true}
        autoCompleteType={'street-address'}
        onSubmitEditing={e => {
          const input = e.nativeEvent.text;
          console.log('[input]', input);
          setInputText(input);
        }}
      />
      {/* List of des */}
      <FlatList
        style={styles.searchResult}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={addressArr}
        renderItem={({item, index}) => (
          <SuggestionRow navigation={navigation} item={item} />
        )}
        keyExtractor={(item, index) => (item + index).toString()}
      />
    </SafeAreaView>
  );
};

export default DestinationSearchScreen;
