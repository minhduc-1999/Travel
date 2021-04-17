import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';
// import {useNavigation} from '@react-navigation/native';

const GuestsScreen = ({navigation}) => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Adults</Text>
            <Text style={{color: '#8d8d8d'}}>Age 13 or above</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => setAdults(Math.max(0, adults - 1))}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>-</Text>
            </Pressable>
            <Text style={{marginHorizontal: 20, fontSize: 16}}>{adults}</Text>
            <Pressable
              onPress={() => setAdults(adults + 1)}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Children</Text>
            <Text style={{color: '#8d8d8d'}}>Age 2 - 12</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => setAdults(Math.max(0, children - 1))}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>-</Text>
            </Pressable>
            <Text style={{marginHorizontal: 20, fontSize: 16}}>{children}</Text>
            <Pressable
              onPress={() => setAdults(children + 1)}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Infants</Text>
            <Text style={{color: '#8d8d8d'}}>Under 2</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => setAdults(Math.max(0, infants - 1))}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>-</Text>
            </Pressable>
            <Text style={{marginHorizontal: 20, fontSize: 16}}>{infants}</Text>
            <Pressable
              onPress={() => setAdults(infants + 1)}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View>
        <Pressable onPress={() => navigation.navigate('HomeTabnavigator',
        {
          screen: 'Explore',
          params: {
            screen: 'SearchResults'
          }          
        })} style={styles.searchButton}>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GuestsScreen;
