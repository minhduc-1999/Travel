import React, {createContext} from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ReactObserver from 'react-event-observer';
import {AuthContext} from '../navigation/AuthProvider';
import {geohashQueryBounds, distanceBetween} from 'geofire-common';
const observer = ReactObserver();

export const DbContext = createContext();

const DbProvider = ({children}) => {
  const {userAcc} = React.useContext(AuthContext);
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
        loadUserData: async () => {
          console.log(Date.now() + ': load user data');
          return firestore()
            .collection('User')
            .where('accountId', '==', userAcc.uid)
            .limit(1)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.size == 1) {
                const _user = querySnapshot.docs[0].data();
                const _refId = querySnapshot.docs[0].ref.id;
                return {info: _user, refId: _refId};
              } else {
                return firestore()
                  .collection('User')
                  .add({
                    accountId: userAcc.uid,
                    firstName: 'Unknow',
                    lastName: '',
                    sex: '',
                    dateOB: '',
                    about: '',
                    imageUrl: '',
                    email: userAcc.email,
                  })
                  .then(res => {
                    return {
                      refId: res.id,
                      info: {
                        accountId: userAcc.uid,
                        firstName: 'Unknow',
                        lastName: '',
                        sex: '',
                        dateOB: '',
                        about: '',
                        imageUrl: '',
                        email: userAcc.email,
                      },
                    };
                  });
              }
            })
            .catch(err => {
              console.error(err);
              throw new Error('Cannot load user profile');
            });
        },
        updateUserProfile: async (userRefId, updateInfo) => {
          console.log(Date.now() + ': update user data');
          if (!userRefId) {
            console.log('no profile');
            throw new Error('no profile exist');
          }
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
        loadTags: async () => {
          console.log(Date.now() + ' - Load all tags');
          return firestore()
            .collection('tags')
            .limit(10)
            .get()
            .then(querySnapshot => {
              return querySnapshot.docs.map(doc => doc.data());
            })
            .catch(err => {
              throw new Error(err);
            });
        },
        loadDestinations: async (center, limit, offset) => {
          console.log(Date.now() + ' - Load Destinations');
          // console.log('off set -', offset, center);
          const radiusInM = offset * 1000;
          const bounds = geohashQueryBounds(center, radiusInM);

          const promises = [];
          for (const b of bounds) {
            const q = firestore()
              .collection('destinations')
              .orderBy('coordinate.geoHash')
              .startAt(b[0])
              .endAt(b[1]);

            promises.push(q.get());
          }

          return Promise.all(promises)
            .then(snapshots => {
              const matchingDocs = [];

              for (const snap of snapshots) {
                // console.log('[SNAP SHOT]', snap.metadata);
                for (const doc of snap.docs) {
                  const lat = Number(doc.get('coordinate.latitude'));
                  const lng = Number(doc.get('coordinate.longitude'));

                  // We have to filter out a few false positives due to GeoHash
                  // accuracy, but most will match
                  const distanceInKm = distanceBetween([lat, lng], center);
                  const distanceInM = distanceInKm * 1000;
                  if (distanceInM <= radiusInM) {
                    matchingDocs.push(doc);
                  }
                }
              }

              return matchingDocs;
            })
            .then(matchingDocs => {
              // console.log('[This step]', matchingDocs);
              return matchingDocs.map(doc => doc.data());
            })
            .catch(console.error);

          // return firestore()
          //   .collection('destinations')
          //   .orderBy('coordinate.latitude', 'asc')
          //   .limit(limit)
          //   .get()
          //   .then(querySnapshot => {
          //     console.log(querySnapshot.size);
          //     return querySnapshot.docs.map(doc => doc.data());
          //   })
          //   .catch(err => {
          //     throw new Error(err);
          //   });
        },
        loadMoreDestinations: async (long, lat, limit, last) => {
          console.log(Date.now() + ' - Load More Destinations');
          return firestore()
            .collection('destinations')
            .orderBy('coordinate.latitude', 'asc')
            .startAfter(last)
            .limit(limit)
            .get()
            .then(querySnapshot => {
              console.log(querySnapshot.size);
              return querySnapshot.docs.map(doc => {
                return {...doc.data(), id: doc.ref.id};
              });
            })
            .catch(err => {
              throw new Error(err);
            });
        },
        loadDestinationsByTag: async (tagName, limit) => {
          return firestore()
            .collection('destinations')
            .where('tags', 'array-contains', tagName)
            .orderBy('coordinate.latitude', 'asc')
            .limit(limit)
            .get()
            .then(querySnapshot => {
              // console.log(querySnapshot.size);
              return querySnapshot.docs.map(doc => {
                return {...doc.data(), id: doc.ref.id};
              });
            })
            .catch(err => {
              throw new Error(err);
            });
        },
        loadMoreDestinationsByTag: async (tagName, limit, last) => {
          console.log(Date.now() + ' - Load More Destinations');
          return firestore()
            .collection('destinations')
            .where('tags', 'array-contains', tagName)
            .orderBy('coordinate.latitude', 'asc')
            .startAfter(last)
            .limit(limit)
            .get()
            .then(querySnapshot => {
              // console.log(querySnapshot.size);
              return querySnapshot.docs.map(doc => {
                return {...doc.data(), id: doc.ref.id};
              });
            })
            .catch(err => {
              throw new Error(err);
            });
        },
      }}>
      {children}
    </DbContext.Provider>
  );
};

export default DbProvider;
