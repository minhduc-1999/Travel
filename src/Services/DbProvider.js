import React, {createContext} from 'react';
import storage, {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ReactObserver from 'react-event-observer';
import {AuthContext} from '../navigation/AuthProvider';
import {geohashQueryBounds, distanceBetween} from 'geofire-common';
import {measure} from 'react-native-reanimated';
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
            .doc(userAcc.uid)
            .get()
            .then(documentSnapshot => {
              if (documentSnapshot.exists) {
                const _user = documentSnapshot.data();
                const _refId = documentSnapshot.ref.id;
                return {info: _user, refId: _refId};
              } else {
                return firestore()
                  .collection('User')
                  .doc(userAcc.uid)
                  .set({
                    firstName: 'Unknow',
                    lastName: '',
                    sex: '',
                    dateOB: '',
                    about: '',
                    imageUrl: '',
                    email: userAcc.email,
                  })
                  .then(() => {
                    return {
                      refId: userAcc.uid,
                      info: {
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
        updateUserProfile: async updateInfo => {
          console.log(Date.now() + ': update user data');
          if (!userAcc.uid) {
            console.log('no profile');
            throw new Error('no profile exist');
          }
          return firestore()
            .collection('User')
            .doc(userAcc.uid)
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
              return querySnapshot.docs.map(doc => {
                return {...doc.data(), refId: doc.ref.id};
              });
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
              return matchingDocs.map(doc => {
                return {...doc.data(), id: doc.ref.id};
              });
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
        loadWishlists: async () => {
          return firestore()
            .collection('wishlists')
            .where('userId', '==', userAcc.uid)
            .orderBy('createDate', 'desc')
            .limit(10)
            .get()
            .then(querySnapshot => {
              return querySnapshot.docs.map(doc => {
                return {...doc.data(), id: doc.ref.id};
              });
            })
            .then(data => {
              const res = [];
              for (let i in data) {
                res.push(
                  firestore()
                    .collection('destinations')
                    .doc(data[i].destinations[0])
                    .get()
                    .then(res => {
                      data[i].repImage = res.data().images[0];
                      return data[i];
                    })
                    .catch(() => {
                      data[i].repImage = '';
                      return data[i];
                    }),
                );
              }
              return Promise.all(res);
            })
            .catch(error => {
              throw new Error(error);
            });
        },
        loadDestinationsByRefId: async listDes => {
          const res = [];
          for (const d of listDes) {
            res.push(
              firestore()
                .collection('destinations')
                .doc(d)
                .get()
                .then(res => {
                  return {...res.data(), id: d};
                }),
            );
          }
          return Promise.all(res);
        },
        addDestinationToWishlist: async (desId, wlId) => {
          if (!desId || !wlId) {
            throw new Error('destination or wishlist does not exist');
          }
          return firestore()
            .collection('wishlists')
            .doc(wlId)
            .update({
              destinations: firestore.FieldValue.arrayUnion(desId),
            })
            .then(() => {
              observer.publish('onWishlistChange');
              return true;
            })
            .catch(err => {
              throw new Error(err);
            });
        },
        addNewWishlist: async (desId, wlName) => {
          if (!desId || !wlName || !userAcc) {
            throw new Error('destination does not exist');
          }
          const data = {
            createDate: firebase.firestore.Timestamp.now(),
            destinations: [desId],
            name: wlName,
            userId: userAcc.uid,
          };
          return firestore()
            .collection('wishlists')
            .add(data)
            .then(res => {
              observer.publish('onWishlistChange');
            })
            .catch(err => {
              throw new Error(err);
            });
        },
        removeDestinationFromWishlist: async (desId, listWl) => {
          if (!desId || listWl.length < 1) {
            throw new Error('destination does not exist');
          }
          for (let index in listWl) {
            const wishlist = listWl[index];
            const {destinations} = wishlist;
            if (destinations.includes(desId)) {
              const updateData = {
                destinations: firestore.FieldValue.arrayRemove(desId),
              };
              // if (destinations.indexOf(desId) === 0) {
              //   if (destinations.length > 1) {
              //     firestore()
              //       .collection('destinations')
              //       .doc(destinations[1])
              //       .get()
              //       .then(res => {
              //         console.warn(res.data().name);
              //         updateData.repImage = res.data().images[0];
              //       })
              //       .catch(() => {
              //         updateData.repImage = '';
              //       });
              //   } else {
              //     updateData.repImage = '';
              //   }
              // }
              return firestore()
                .collection('wishlists')
                .doc(wishlist.id)
                .update(updateData)
                .then(() => {
                  observer.publish('wishlistDesChange', desId);
                  return true;
                })
                .catch(err => false);
            }
          }
          return false;
        },
        deleteWishlist: async wlId => {
          if (!wlId) {
            throw new Error('This wishlist does not exist');
          }
          return firestore()
            .collection('wishlists')
            .doc(wlId)
            .delete()
            .then(() => {
              observer.publish('onWishlistChange');
            });
        },
        updateWishlistName: async (wishlist, wlName) => {
          if (!wishlist || wlName === '') {
            throw new Error('Update wishlist name failed');
          }
          firestore()
            .collection('wishlists')
            .doc(wishlist.id)
            .update({name: wlName})
            .then(() => {
              observer.publish('wishlistNameChange', wlName);
              return true;
            });
        },
        onWishlistChange: (handler, event) => {
          const listener = observer.subscribe(event, handler);
          return listener.unsubscribe;
        },
        rate: async (desId, rate) => {
          const {star, comment} = rate;
          firestore().collection('comments').doc(desId).set({
            comment: comment,
            star: star,
            voter: userAcc.uid,
          });
        },
        loadComments: async (desId, limit) => {
          console.log('load comments');
          const comments = await firestore()
            .collection('comments')
            .where('desId', '==', desId)
            .orderBy('dateCreated', 'desc')
            .limit(limit)
            .get()
            .then(querySnapshot => {
              console.log('[size]', querySnapshot.size);
              return querySnapshot.docs.map(doc => {
                return {...doc.data(), id: doc.ref.id};
              });
            })
            .catch(err => {
              throw new Error(err);
            });
          const promises = [];
          for (const index in comments) {
            promises.push(
              firestore()
                .collection('User')
                .doc(comments[index].voter)
                .get()
                .then(doc => {
                  const user = doc.data();
                  return {
                    avatar: user.imageUrl,
                    voter: user.firstName + ' ' + user.lastName,
                    dateCreated: comments[index].dateCreated,
                    comment: comments[index].comment,
                    star: comments[index].star,
                    key: comments[index].id,
                  };
                }),
            );
          }
          return Promise.all(promises);
        },
        loadMoreComments: async (desId, limit, last) => {
          console.log(' - Load More Comment - ');
          return firestore()
            .collection('comments')
            .where('desId', '==', desId)
            .orderBy('dateCreated', 'desc')
            .startAfter(last)
            .limit(limit)
            .get()
            .then(querySnapshot => {
              return querySnapshot.docs.map(doc => {
                return {...doc.data(), id: doc.ref.id};
              });
            })
            .catch(err => {
              throw new Error(err);
            });
        },
        loadOwnComment: async desId => {
          return firestore()
            .collection('comments')
            .doc(`${desId}_${userAcc.uid}`)
            .get()
            .then(doc => {
              if (doc.exists) return {...doc.data(), id: doc.ref.id};
              return null;
            })
            .catch(err => {
              return null;
            });
        },
        postComment: async rate => {
          const {meta, comment, star, desId} = rate;
          try {
            const existed = await firestore()
              .collection('comments')
              .doc(`${desId}_${userAcc.uid}`)
              .get()
              .then(doc => {
                return doc.data();
              });
            const result = await firestore()
              .collection('comments')
              .doc(`${desId}_${userAcc.uid}`)
              .set({
                comment: comment,
                dateCreated: firestore.FieldValue.serverTimestamp(),
                star: star,
                desId: desId,
                voter: userAcc.uid,
              })
              .then(() => {
                return true;
              });
            // console.log('old', meta.report);
            if (result && existed) {
              meta.report[existed.star - 1]--;
            }
            meta.report[star - 1]++;
            // console.log('new', meta.report);
            const totalStar = meta.report.reduce(
              (acc, cur, index) => acc + cur * (index + 1),
              0,
            );
            const totalAmount = meta.report.reduce((acc, cur) => acc + cur);
            const updateData = {
              rate: {
                avg: Math.round((totalStar / totalAmount) * 10) / 10,
                report: [...meta.report],
              },
            };
            return firestore()
              .collection('destinations')
              .doc(desId)
              .update(updateData)
              .then(() => {
                observer.publish('onPostComment', {...updateData, desId});
                return true;
              })
              .catch(err => {
                throw new Error(err);
              });
          } catch {
            return false;
          }
        },
        registerEvent: (event, handler) => {
          const listener = observer.subscribe(event, handler);
          return listener.unsubscribe;
        },
      }}>
      {children}
    </DbContext.Provider>
  );
};

export default DbProvider;
