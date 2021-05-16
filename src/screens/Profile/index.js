import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import styles from './styles';
import user from '../../../assets/data/user';
import Icon from 'react-native-vector-icons/FontAwesome';
// import TextEditListItem from '../../components/CustomListItem/TextEditListItem';
const ProfileScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userImage}>
        <Avatar
          rounded
          size="xlarge"
          source={require('../../../assets/images/wallpaper.jpg')}>
          <View style={styles.badgeContainer}>
            <TouchableOpacity
              style={styles.badgeStyle}
              onPress={() => console.warn('change avatar')}>
              <Icon name="camera" size={18} />
            </TouchableOpacity>
          </View>
        </Avatar>
      </View>
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.field}>First Name</Text>
          <TextInput textContentType={'name'} style={styles.fieldValue}>
            {user.firstName}
          </TextInput>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.field}>Last Name</Text>
          <TextInput textContentType={'familyName'} style={styles.fieldValue}>
            {user.lastName}
          </TextInput>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.field}>Email</Text>
          <TextInput editable={false} style={styles.fieldValue}>
            {user.email}
          </TextInput>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.field}>Sex</Text>
          <TextInput style={styles.fieldValue}>{user.sex}</TextInput>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.field}>Date Of Birth</Text>
          <TextInput style={styles.fieldValue}>{user.dateOB}</TextInput>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.field}>About</Text>
          <TextInput style={styles.fieldValue} multiline={true}>
            {user.about}
          </TextInput>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
