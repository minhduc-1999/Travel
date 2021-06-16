import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styles from './styles';
import {Avatar} from 'react-native-elements';
import GroupListItem from '../../components/CustomListItem/GroupListItem';
import SwitchListItem from '../../components/CustomListItem/SwitchListItem';
import {AuthContext} from '../../navigation/AuthProvider';
import {DbContext} from '../../Services/DbProvider';

const MenuScreen = ({navigation}) => {
  const {logout, userAcc} = useContext(AuthContext);
  const {loadUserData, onUserProfileChange} = useContext(DbContext);

  const [user, setUser] = useState(null);

  useEffect(async () => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const unsub = onUserProfileChange(data => {
      if (!user)
        setUser({
          refId: user.refId,
          info: {
            ...user.info,
            ...data,
          },
        });
    });
    return unsub;
  });

  const fetchUserData = async () => {
    loadUserData(userAcc.uid)
      .then(value => {
        if (value) setUser(value);
      })
      .catch(err => console.error(err));
  };
  console.log('Menu screen render');
  return (
    <SafeAreaView
      style={{paddingTop: 20, minHeight: '100%', backgroundColor: '#fff'}}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
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
    </SafeAreaView>
  );
};

export default MenuScreen;
