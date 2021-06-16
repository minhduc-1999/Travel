import React, {useState} from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import FormInput from '../../components/Utils/FormInput';
import FormButton from '../../components/Utils/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';

import styles from './styles';
import {useContext} from 'react/cjs/react.development';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {forgotPassword} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.text}>Enter your email to find account</Text>

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormButton buttonTitle="Send" onPress={() => forgotPassword(email)} />
    </SafeAreaView>
  );
};

export default ForgotPassword;
