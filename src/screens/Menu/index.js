import React, {useContext} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Avatar} from 'react-native-elements';
import CustomListItem from '../../components/CustomListItem/GroupListItem';
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
          <Text style={{fontSize: 16}}>Name Will Come Here</Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 16,
            }}>
            Email Will Come here
          </Text>
        </View>
      </View>
      <Text style={styles.groupText}>Account</Text>
      <View>
        <CustomListItem title="Profile" iconName="person" iconType="material" />
        <CustomListItem
          title="Change Password"
          iconName="lock"
          iconType="material"
        />
      </View>
      <Text style={styles.groupText}>More</Text>
      <View>
        <SwitchListItem
          title="Push Notifications"
          iconName="notifications"
          iconType="material"
          onSwitchStateChange={value => {}}
          initState={true}
          switchColor={'#f15454'}
        />
        <SwitchListItem
          title="Dark Mode"
          iconName="dark"
          iconType="material"
          onSwitchStateChange={value => {}}
          initState={false}
          switchColor={'#f15454'}
        />
        <CustomListItem
          title="Send feedbacks"
          iconName="feedback"
          iconType="material"
        />
        <CustomListItem
          onPress={() => logout()}
          title="Log Out"
          iconName="logout"
          iconType="material"
        />
      </View>
    </ScrollView>
  );
};

export default MenuScreen;
