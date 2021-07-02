import React, {useContext, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import FormInput from '../../components/Utils/FormInput';
import FormButton from '../../components/Utils/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import styles from './styles';
const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {register} = useContext(AuthContext);
  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#f9fafd'}}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Tạo một tài khoản</Text>

          <FormInput
            labelValue={email}
            onChangeText={userEmail => setEmail(userEmail)}
            placeholderText="Email"
            iconType="mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormInput
            labelValue={password}
            onChangeText={userPassword => setPassword(userPassword)}
            placeholderText="Mật khẩu"
            iconType="lock"
            secureTextEntry={true}
          />

          <FormInput
            labelValue={confirmPassword}
            onChangeText={userPassword => setConfirmPassword(userPassword)}
            placeholderText="Xác nhận mật khẩu"
            iconType="lock"
            secureTextEntry={true}
          />

          <FormButton
            buttonTitle="Đăng ký"
            onPress={() => {
              if (email && password && confirmPassword) {
                if (password === confirmPassword) register(email, password);
                else {
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Mật khẩu và xác nhận mật khẩu không khớp',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                  });
                }
              } else {
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1: 'Vui lòng nhập email và mật khẩu',
                  visibilityTime: 2000,
                  autoHide: true,
                  bottomOffset: 40,
                });
              }
            }}
          />

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              Bằng cách đăng ký, bạn đồng ý với{' '}
            </Text>
            <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
              <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                Điều khoản
              </Text>
            </TouchableOpacity>
            <Text style={styles.color_textPrivate}> và </Text>
            <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
              Chính sách quyền riêng tư
            </Text>
            <Text style={styles.color_textPrivate}> của chúng tôi</Text>
          </View>

          {/* {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          />

          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {}}
          />
        </View>
      ) : null} */}

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navButtonText}>Đã có tài khoản? Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
