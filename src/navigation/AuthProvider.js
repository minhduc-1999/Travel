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
            console.log(email + password);
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.error(error);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (error) {
            console.error(error);
          }
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
          var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
          user.reauthenticateWithCredential(cred).then(() => {
            user.updatePassword(newPassword).then(() => {
              alert('Password was changed. You need to sign in again.');
              auth().signOut();
            }).catch((error) => console.log(error.message));
          }).catch((error) => console.log(error.message));
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
