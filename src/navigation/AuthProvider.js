import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

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
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            switch (error.code) {
              case 'auth/user-not-found':
                alert('User not found');
                break;
              case 'auth/user-disabled':
                alert('User has been disabled');
                break;
              case 'auth/wrong-password':
                alert('Password is not correct');
                break;
              case 'auth/invalid-email':
                alert('Invalid email');
                break;
            }
          }
        },
        register: async (email, password) => {
          console.log('create account');
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCre => {
              if (userCre) {
                console.log('[new] create account');
                return true;
              }
              throw new Error('Unknow error');
            })
            .catch(error => {
              switch (error.code) {
                case 'auth/email-already-in-use':
                  alert('Email already in use');
                  break;
                case 'auth/weak-password':
                  alert('This password is not strong enough');
                  break;
                case 'auth/invalid-email':
                  alert('Invalid email');
                  break;
              }
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
                  alert('Password was changed. You need to sign in again.');
                  auth().signOut();
                })
                .catch(error => console.log(error.message));
            })
            .catch(error => {
              switch (error.code) {
                case 'auth/wrong-password':
                  alert('Current password is not correct');
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
