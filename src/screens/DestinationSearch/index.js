import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import styles from './styles';
import SuggestionRow from './SuggestionRow';
import SECRET from '../../../secret';
import {SEARCH_OPTION} from '../../../map_config';
import {encodeQueryData} from '../../Utils/Dimention';
import Toast from 'react-native-toast-message';

const DestinationSearchScreen = ({navigation, route}) => {
  const [inputText, setInputText] = useState('');
  const [addressArr, setAddressArr] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (inputText) {
      const params = {
        query: inputText,
        includeNeighborhood: 1,
        maxResults: SEARCH_OPTION.SearchMaxResult,
        key: SECRET.KEY,
      };
      const query = encodeQueryData(params);
      const url = `http://dev.virtualearth.net/REST/v1/Locations?${query}`;
      // console.log(url);
      console.log('--------------Fetch API-----------------');
      fetch(url)
        .then(response => {
          if (response.status === 200) return response.json();
          throw new Error('Server Error');
        })
        .then(json => {
          // console.warn(json.resourceSets[0].resources);
          if (mounted) {
            const a = json.resourceSets[0].resources
              .filter(rsc => rsc.confidence === 'High')
              .map(des => {
                return {
                  name: des.name,
                  coordinates: {
                    lat: des.point.coordinates[0],
                    long: des.point.coordinates[1],
                  },
                  address: des.address,
                  confidence: des.confidence,
                };
              });
            setAddressArr(a);
          }
        })
        .catch(err => {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: err,
            visibilityTime: 2000,
            autoHide: true,
            bottomOffset: 40,
          });
        });
    }
    return function () {
      mounted = false;
    };
  }, [inputText]);

  const renderResult = () => {
    return addressArr.length ? (
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
    ) : inputText ? (
      <View
        style={[
          styles.searchResult,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Text style={{fontSize: 18, color: 'silver'}}>
          Không tìm thấy địa điểm
        </Text>
      </View>
    ) : null;
  };

  console.log('destination Search screen render');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      {/* input component */}
      <TextInput
        autoFocus={true}
        numberOfLines={1}
        style={styles.textInput}
        placeholder={'Bạn sẽ đi đâu?'}
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
      {renderResult()}
    </SafeAreaView>
  );
};

export default DestinationSearchScreen;
