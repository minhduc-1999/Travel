import React, {useContext} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Avatar} from 'react-native-elements';
import GroupListItem from '../../components/CustomListItem/GroupListItem';
import SwitchListItem from '../../components/CustomListItem/SwitchListItem';
import {AuthContext} from '../../navigation/AuthProvider';
const MenuScreen = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.userRow}>
        <TouchableOpacity>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={require('../../../assets/images/wallpaper.jpg')}
            />
          </View>
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 20}}>Name Will Come Here</Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 18,
            }}>
            Email Will Come here
          </Text>
        </View>
      </View>
      <Text style={styles.groupText}>Account</Text>
      <View>
        <GroupListItem
          title="Profile"
          iconName="user-o"
          onPress={() => navigation.navigate('Profile')}
        />
        <GroupListItem
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
  );
};

export default MenuScreen;
