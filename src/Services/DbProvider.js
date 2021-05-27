import React, {createContext} from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ReactObserver from 'react-event-observer';

const observer = ReactObserver();

export const DbContext = createContext();

const DbProvider = ({children}) => {
  return (
    <DbContext.Provider
      value={{
        uploadPhoto: async (refPath, filePath) => {
          try {
            console.log(Date.now() + ': Upload photo');
            const reference = storage().ref(refPath);
            return reference.putFile(filePath);
          } catch (error) {
            console.error(error);
            throw new Error('Cannot upload image');
          }
        },
        deletePhoto: async url => {
          if (url === null || url === '') return;
          return storage()
            .refFromURL(url)
            .delete()
            .then(() => console.log(Date.now() + ': Delete photo'))
            .catch(err => {
              console.error(err);
              throw new Error('Cannot Change Your Photo');
            });
        },
        getDownloadUrl: async refPath => {
          console.log(Date.now() + ': get Url of photo');
          return storage().ref(refPath).getDownloadURL();
        },
        loadUserData: async accountId => {
          console.log(Date.now() + ': load user data');
          return firestore()
            .collection('User')
            .where('accountId', '==', accountId)
            .limit(1)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.size == 1) {
                const _user = querySnapshot.docs[0].data();
                const _refId = querySnapshot.docs[0].ref.id;
                return {info: _user, refId: _refId};
              }
            })
            .catch(err => {
              console.error(err);
              throw new Error('Cannot load user profile');
            });
        },
        updateUserProfile: async (userRefId, updateInfo) => {
          console.log(Date.now() + ': update user data');
          return firestore()
            .collection('User')
            .doc(userRefId)
            .update(updateInfo)
            .then(() => {
              observer.publish('infoChange', updateInfo);
              return true;
            })
            .catch(err => {
              throw new Error(`[UPDATE_USER] ${err}`);
            });
        },
        onUserProfileChange: handler => {
          const listener = observer.subscribe('infoChange', handler);
          return listener.unsubscribe;
        },
      }}>
      {children}
    </DbContext.Provider>
  );
};

export default DbProvider;
