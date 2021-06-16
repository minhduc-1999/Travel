import React, {useContext, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import FormInput from '../../components/Utils/FormInput';
import FormButton from '../../components/Utils/FormButton';
// import SocialButton from '../../components/FormInput/SocialButton';
import {AuthContext} from '../../navigation/AuthProvider';
import styles from './styles';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../assets/images/wallpaper.jpg')}
          style={styles.logo}
        />
        <Text style={styles.text}>Travelad</Text>

        <FormInput
          labelValue={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholderText="Email"
          iconType="person"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign In"
          onPress={() => login(email, password)}
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
            Don't have an acount? Create here
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
