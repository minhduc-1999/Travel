import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import FormInput from '../../components/Utils/FormInput';
import FormButton from '../../components/Utils/FormButton';
// import SocialButton from '../../components/FormInput/SocialButton';
import {AuthContext} from '../../navigation/AuthProvider';
import styles from './styles';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle="dark-content"
        translucent
      />

      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground
          source={require('../../../assets/images/Vinhhalong.png')}
          style={styles.image}>
          <View style={styles.contentContainer}>
            <Image
              source={require('../../../assets/images/Travelad.png')}
              style={styles.logo}
            />
            {/* <Text style={styles.text}>Travelad</Text> */}

            <FormInput
              labelValue={email}
              onChangeText={userEmail => setEmail(userEmail)}
              placeholderText="Email"
              iconType="email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <FormInput
              labelValue={password}
              onChangeText={userPassword => setPassword(userPassword)}
              placeholderText="Mật khẩu"
              iconType="lock"
              secureTextEntry
            />

            <FormButton
              buttonTitle="Đăng nhập"
              onPress={() => {
                if (!email || !password) {
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Vui lòng nhập email và mật khẩu',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                  });
                  return;
                }
                login(email, password);
              }}
            />

            {/* {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null} */}

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.navButtonText}>
                Chưa có tài khoản? Tạo ngay
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.navButtonText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
