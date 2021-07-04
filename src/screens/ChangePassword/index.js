import React, {useContext, useState} from 'react';
import {SafeAreaView, StatusBar, ScrollView} from 'react-native';
import styles from './styles';
import FormInput from '../../components/Utils/FormInput';
import FormButton from '../../components/Utils/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import Toast from 'react-native-toast-message';

const ChangePassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const {changePassword} = useContext(AuthContext);
  console.log('change password screen render');
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <FormInput
          labelValue={currentPassword}
          onChangeText={userCurrentPassword =>
            setCurrentPassword(userCurrentPassword)
          }
          placeholderText="Mật khẩu hiện tại"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormInput
          labelValue={newPassword}
          onChangeText={userNewPassword => setNewPassword(userNewPassword)}
          placeholderText="Mật khẩu mới"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormInput
          labelValue={confirmPassword}
          onChangeText={confirmPass => setConfirmPassword(confirmPass)}
          placeholderText="Xác nhận mật khẩu mới"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Đổi mật khẩu"
          onPress={() => {
            if (confirmPassword !== newPassword) {
              Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Mật khẩu xác nhận không chính xác',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 40,
              });
            } else changePassword(currentPassword, newPassword);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
