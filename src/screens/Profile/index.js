import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {HeaderBackButton} from '@react-navigation/stack';

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = ({navigation, route}) => {
  const [editable, setEditable] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(null);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        editable ? (
          <TouchableOpacity
            style={styles.headerRight}
            onPress={() => saveProfile()}>
            <Icon name="check" size={25} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.headerRight}
            onPress={() => setEditable(true)}>
            <Icon name="edit" size={25} />
          </TouchableOpacity>
        ),
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            goBackCustom();
          }}
        />
      ),
    });
  });

  const {user} = route.params;

  const saveProfile = () => {
    if (updateInfo === null) return;
    firestore()
      .collection('User')
      .doc(user.refId)
      .update(updateInfo)
      .then(() => {
        console.log('User updated');
        setEditable(false);
        setUpdateInfo(null);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const unsavedAlert = () =>
    Alert.alert('Unsaved Changes', 'Do you want to save your changes?', [
      {
        text: 'Save',
        onPress: () => {
          saveProfile();
          navigation.goBack();
        },
      },
      {
        text: 'Discard',
        style: 'cancel',
        onPress: () => navigation.goBack(),
      },
    ]);

  const goBackCustom = () => {
    if (editable && updateInfo !== null) {
      unsavedAlert();
    } else navigation.goBack();
  };

  const onInfoChange = (fieldName, newValue) => {
    if (user.info[fieldName] === newValue) return;
    const obj = {...updateInfo};
    obj[fieldName] = newValue;
    setUpdateInfo(obj);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userImage}>
        <Avatar rounded size="xlarge" source={{uri: user.info.imageUrl}}>
          <View style={styles.badgeContainer}>
            <TouchableOpacity
              style={styles.badgeStyle}
              onPress={() => {
                console.warn('change avatar');
              }}>
              <Icon name="camera" size={18} />
            </TouchableOpacity>
          </View>
        </Avatar>
      </View>
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.field}>First Name</Text>
          <TextInput
            editable={editable}
            onChangeText={text => onInfoChange('firstName', text)}
            textContentType={'name'}
            style={styles.fieldValue}>
            {user.info.firstName}
          </TextInput>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={styles.field}>Last Name</Text>
          <TextInput
            editable={editable}
            onChangeText={text => onInfoChange('lastName', text)}
            textContentType={'familyName'}
            style={styles.fieldValue}>
            {user.info.lastName}
          </TextInput>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={styles.field}>Email</Text>
          <TextInput
            onChangeText={text => onInfoChange('email', text)}
            editable={editable}
            style={styles.fieldValue}>
            {user.info.email}
          </TextInput>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={styles.field}>Sex</Text>
          <TextInput
            onChangeText={text => onInfoChange('sex', text)}
            editable={editable}
            style={styles.fieldValue}>
            {user.info.sex}
          </TextInput>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={styles.field}>Date Of Birth</Text>
          <TextInput
            onChangeText={text => onInfoChange('dateOB', text)}
            editable={editable}
            style={styles.fieldValue}>
            {new Date(user.info.dateOB).toLocaleDateString('vi-VI')}
          </TextInput>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={styles.field}>About</Text>
          <TextInput
            onChangeText={text => onInfoChange('about', text)}
            editable={editable}
            style={styles.fieldValue}
            multiline={true}>
            {user.info.about}
          </TextInput>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
