import React, {useState, useRef, useEffect, useContext} from 'react';
import {HeaderBackButton} from '@react-navigation/stack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {DbContext} from '../../Services/DbProvider';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Divider from '../../components/Divider';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const ProfileScreen = ({navigation, route}) => {
  const sheetRef = useRef(null);
  const [editable, setEditable] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [user, setUser] = useState(route.params.user);
  const {
    updateUserProfile,
    deletePhoto,
    uploadPhoto,
    getDownloadUrl,
    onUserProfileChange,
  } = useContext(DbContext);

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

  const fall = new Animated.Value(1);

  const saveProfile = () => {
    if (updateInfo === null) return;
    updateUserProfile(user.refId, updateInfo)
      .then(() => {
        setEditable(false);
        setUpdateInfo(null);
      })
      .catch(err => console.error(err));
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

  const takePhotoFromCamera = () => {
    launchCamera(
      {mediaType: 'photo', saveToPhotos: true, cameraType: 'back'},
      setImageSource,
    );
  };

  const choosePhotoFromLibrary = () => {
    launchImageLibrary({mediaType: 'photo'}, setImageSource);
  };
  const renderContent = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
        <View style={styles.sheetDivider} />
      </View>
    </View>
  );

  const setImageSource = res => {
    if (res.didCancel) {
      console.log('user cancle image picker');
    } else if (res.errorMessage) {
      console.error('Image error = ', res.errorMessage);
    } else {
      sheetRef.current.snapTo(1);
      let source = {uri: res.uri.replace('file://', ''), isStatic: true};
      if (Platform.OS === 'android') {
        source = {uri: res.uri, isStatic: true};
      }
      const name = Date.now() + '_' + user.refId;
      const refPath = '/avatar/' + name;
      if (user.info.imageUrl) {
        deletePhoto(user.info.imageUrl)
          .then(() => uploadPhoto(refPath, source.uri))
          .then(() => {
            console.log('Upload avatar successfully');
            return getDownloadUrl(refPath);
          })
          .then(url => {
            updateUserProfile(user.refId, {imageUrl: url});
            return url;
          })
          // .then(url => {
          //   setUser({
          //     refId: user.refId,
          //     info: {
          //       ...user.info,
          //       imageUrl: url,
          //     },
          //   });
          // })
          .catch(err => console.error(err));
      } else {
        uploadPhoto(refPath, source.uri)
          .then(() => {
            console.log('Upload avatar successfully');
            return getDownloadUrl(refPath);
          })
          .then(url => {
            updateUserProfile(user.refId, {imageUrl: url});
            return url;
          })
          .catch(err => console.error(err));
      }
    }
  };
  console.log('Profile screen render');
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[330, 0]}
          initialSnap={1}
          borderRadius={10}
          renderContent={renderContent}
          renderHeader={renderHeader}
          callbackNode={fall}
        />
        <Animated.View
          style={{
            opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
          }}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.userImage}>
              <Avatar
                rounded
                size="xlarge"
                source={
                  user.info.imageUrl
                    ? {uri: user.info.imageUrl}
                    : require('../../../assets/images/anonymous.png')
                }>
                <View style={styles.badgeContainer}>
                  <TouchableOpacity
                    style={styles.badgeStyle}
                    onPress={() => sheetRef.current.snapTo(0)}>
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
                  {user.info.dateOB
                    ? new Date(user.info.dateOB).toLocaleDateString('vi-VI')
                    : ''}
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
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
