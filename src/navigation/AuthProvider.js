import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [userAcc, setUserAcc] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        userAcc,
        setUserAcc,
        login: async (email, password) => {
          try {
            const cre = await auth().signInWithEmailAndPassword(
              email,
              password,
            );
            if (!cre.user.emailVerified) {
              Alert.alert(
                'Lỗi đăng nhập',
                'Email của bạn chưa được xác nhận, vui lòng xác nhận email trước khi đăng nhập',
                [
                  {
                    text: 'Send email',
                    onPress: () => {
                      cre.user.sendEmailVerification();
                      Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: 'Vui lòng kiểm tra hộp thư của bạn',
                        visibilityTime: 2000,
                        autoHide: true,
                        bottomOffset: 40,
                      });
                    },
                  },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
              );
            }
          } catch (error) {
            switch (error.code) {
              case 'auth/user-not-found':
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1: 'Không tìm thấy người dùng',
                  visibilityTime: 2000,
                  autoHide: true,
                  bottomOffset: 40,
                });
                break;
              case 'auth/user-disabled':
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1: 'Người dùng đã bị vô hiệu hóa',
                  visibilityTime: 2000,
                  autoHide: true,
                  bottomOffset: 40,
                });
                break;
              case 'auth/wrong-password':
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1: 'Mật khẩu không đúng',
                  visibilityTime: 2000,
                  autoHide: true,
                  bottomOffset: 40,
                });
                break;
              case 'auth/invalid-email':
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1: 'Email không tồn tại',
                  visibilityTime: 2000,
                  autoHide: true,
                  bottomOffset: 40,
                });
                break;
            }
          }
        },
        register: async (email, password) => {
          console.log('create account');
          return auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCre => {
              if (userCre) {
                console.log('[new] create account');
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1:
                    'Tạo tài khoản thành công. Email xác thực đã được gửi đến hộp thư của bạn',
                  visibilityTime: 2000,
                  autoHide: true,
                  bottomOffset: 40,
                });

                userCre.user.sendEmailVerification();
                return true;
              }
            })
            .catch(error => {
              switch (error.code) {
                case 'auth/email-already-in-use':
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Email đã được sử dụng',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                  });
                  break;
                case 'auth/weak-password':
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Mật khẩu yếu. Vui lòng sử dụng mật khẩu mạnh hơn',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                  });
                  break;
                case 'auth/invalid-email':
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Email không hợp lệ',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                  });
                  break;
              }
              return false;
            });
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.error(error);
          }
        },
        forgotPassword: async email => {
          try {
            console.log('forgot password ' + email);
            await auth()
              .sendPasswordResetEmail(email)
              .then(() => alert('Please check your email...'));
          } catch (error) {
            console.error(error);
          }
        },
        changePassword: (currentPassword, newPassword) => {
          var user = auth().currentUser;
          var cred = auth.EmailAuthProvider.credential(
            user.email,
            currentPassword,
          );
          user
            .reauthenticateWithCredential(cred)
            .then(() => {
              user
                .updatePassword(newPassword)
                .then(() => {
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                  });
                  auth().signOut();
                })
                .catch(error => console.log(error.message));
            })
            .catch(error => {
              switch (error.code) {
                case 'auth/wrong-password':
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Mật hiện tại không chính xác',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                  });
                  break;
              }
            });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
