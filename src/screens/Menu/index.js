import React, {useContext} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Avatar} from 'react-native-elements';
import GroupListItem from '../../components/CustomListItem/GroupListItem';
import SwitchListItem from '../../components/CustomListItem/SwitchListItem';
import {AuthContext} from '../../navigation/AuthProvider';
const MenuScreen = ({navigation}) => {
  const {logout, user} = useContext(AuthContext);
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.userRow}>
        <TouchableOpacity>
          <View style={styles.userImage}>
            <Avatar rounded size="large" source={{uri: user.imageUrl}} />
          </View>
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 20}}>
            {user.firstName + ' ' + user.lastName}
          </Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 18,
            }}>
            {user.email}
          </Text>
        </View>
      </View>
      <Text style={styles.groupText}>Account</Text>
      <View>
        <GroupListItem
          showChervon
          title="Profile"
          iconName="user-o"
          onPress={() => navigation.navigate('Profile', {user})}
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
        <GroupListItem
          showChervon
          title="Send feedbacks"
          iconName="comments-o"
        />
        <GroupListItem
          showChervon
          onPress={() => logout()}
          title="Log Out"
          iconName="sign-out"
        />
      </View>
    </ScrollView>
  );
};

export default MenuScreen;
