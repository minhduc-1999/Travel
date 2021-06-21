import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, Text, SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';
import {Avatar} from 'react-native-elements';
import GroupListItem from '../../components/CustomListItem/GroupListItem';
import SwitchListItem from '../../components/CustomListItem/SwitchListItem';
import {AuthContext} from '../../navigation/AuthProvider';
import {DbContext} from '../../Services/DbProvider';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {windowHeight, windowWidth} from '../../Utils/Dimention';
const MenuScreen = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  const {loadUserData, onUserProfileChange} = useContext(DbContext);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    let mounted = true;
    loadUserData()
      .then(value => {
        if (mounted) {
          setUser(value);
          setLoading(false);
        }
      })
      .catch(err => console.error(err));
    return function cleanup() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const unsub = onUserProfileChange(data => {
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

  console.log('Menu screen render');
  return (
    <SafeAreaView
      style={{paddingTop: 20, minHeight: '100%', backgroundColor: '#fff'}}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View>
        <ScrollView style={styles.scroll}>
          {loading ? (
            <View style={styles.userRow}>
              <ContentLoader viewBox={`0 0 ${windowWidth} 80`}>
                <Circle cx="40" cy="40" r="40" />
                <Rect x="90" y="25" rx="4" ry="4" width="300" height="13" />
                <Rect x="90" y="45" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
            </View>
          ) : (
            <View style={styles.userRow}>
              <View>
                <View style={styles.userImage}>
                  <Avatar
                    rounded
                    size="large"
                    source={
                      user.info.imageUrl
                        ? {uri: user.info.imageUrl}
                        : require('../../../assets/images/anonymous.png')
                    }
                  />
                </View>
              </View>
              <View>
                <Text style={{fontSize: 20}}>
                  {user.info
                    ? user.info.firstName + ' ' + user.info.lastName
                    : 'Anonymous'}
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 18,
                  }}>
                  {user.info ? user.info.email : 'Anonymous'}
                </Text>
              </View>
            </View>
          )}

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
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;
