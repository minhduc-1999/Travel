import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Avatar} from 'react-native-elements';
import GroupListItem from '../../components/CustomListItem/GroupListItem';
import SwitchListItem from '../../components/CustomListItem/SwitchListItem';
import {AuthContext} from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const MenuScreen = ({navigation}) => {
  const {logout, userAcc} = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    console.log(Date.now() + ': load data');
    firestore()
      .collection('User')
      .where('accountId', '==', userAcc.uid)
      .limit(1)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size == 1) {
          const _user = querySnapshot.docs[0].data();
          const _refId = querySnapshot.docs[0].ref.id;
          setUser({info: _user, refId: _refId});
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <View>
      {user === null ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView style={styles.scroll}>
          <View style={styles.userRow}>
            <TouchableOpacity>
              <View style={styles.userImage}>
                <Avatar
                  rounded
                  size="large"
                  source={{uri: user.info.imageUrl}}
                />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={{fontSize: 20}}>
                {user.info.firstName + ' ' + user.info.lastName}
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 18,
                }}>
                {user.info.email}
              </Text>
            </View>
          </View>
          <Text style={styles.groupText}>Account</Text>
          <View>
            <GroupListItem
              showChervon
              title="Profile"
              iconName="user-o"
              onPress={() =>
                navigation.navigate('Profile', {
                  user,
                })
              }
            />
            <GroupListItem
              showChervon
              title="Change Password"
              iconName="key"
              onPress={() => navigation.navigate('Change Password')}
            />
          </View>
          <Text style={styles.groupText}>More</Text>
          <View>
            <SwitchListItem
              title="Push Notifications"
              iconName="bell-o"
              onSwitchStateChange={value => {}}
              initState={true}
              switchColor={'#f15454'}
            />
            <SwitchListItem
              title="Dark Mode"
              iconName="moon-o"
              onSwitchStateChange={value => {}}
              initState={false}
              switchColor={'#f15454'}
            />
            <GroupListItem title="Send feedbacks" iconName="comments-o" />
            <GroupListItem
              onPress={() => logout()}
              title="Log Out"
              iconName="sign-out"
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MenuScreen;
