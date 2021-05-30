import React, {useContext, useState} from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import FormInput from '../../components/Utils/FormInput';
import FormButton from '../../components/Utils/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';

const ChangePassword = ({navigation}) => {
  
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const {changePassword} = useContext(AuthContext);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <FormInput
        labelValue={currentPassword}
        onChangeText={userCurrentPassword => setCurrentPassword(userCurrentPassword)}
        placeholderText="Current password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={newPassword}
        onChangeText={userNewPassword => setNewPassword(userNewPassword)}
        placeholderText="New password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Change Password"
        onPress={() => changePassword(currentPassword, newPassword)}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Forgot Password')}>
        <Text style={styles.navButtonText}>Forgot Password</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

export default ChangePassword;