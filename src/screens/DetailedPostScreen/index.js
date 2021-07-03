import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Pressable,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import DetailPost from '../../components/DetailedPost';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../components/CustomHeader';
import {windowHeight} from '../../Utils/Dimention';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import {Image, Divider} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DbContext} from '../../Services/DbProvider';
import {Dialog} from 'react-native-simple-dialogs';
import Toast from 'react-native-toast-message';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DetailedPostScreen = ({route, navigation}) => {
  const {
    loadWishlists,
    addDestinationToWishlist,
    addNewWishlist,
    removeDestinationFromWishlist,
    registerEvent,
  } = useContext(DbContext);
  const sheetRef = useRef(null);
  const [wishlists, setWishlists] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState(
    route.params.post.name,
  );
  const [post, setPost] = useState(route.params.post);

  const [isFavorite, setIsFavorite] = useState(false);
  const scrollY = useSharedValue(0);
  const bsScrollY = useSharedValue(windowHeight);
  const scrollHander = useAnimatedScrollHandler(event => {
    const {y} = event.contentOffset;
    scrollY.value = y;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, windowHeight * 0.2], [0, 1]),
    };
  });

  const shadowAnimStyle = useAnimatedStyle(() => {
    return {
      shadowColor: interpolateColor(
        scrollY.value,
        [0, windowHeight * 0.2],
        ['rgb(255,255,255)', 'rbg(0,0,0)'],
        'RGB',
      ),
    };
  });

  useEffect(() => {
    loadWishlists()
      .then(res => {
        setWishlists(res);
        res.forEach(wishlist => {
          if (wishlist.destinations.includes(post.id)) {
            setIsFavorite(true);
            return;
          }
        });
      })
      .catch(err => console.log(err));
  }, [isFavorite]);

  useEffect(() => {
    const unsub = registerEvent('onPostComment', res => {
      console.log('[onPost]', res);
      setPost({...post, rate: res.rate});
    });
    return unsub;
  });

  console.log('detail post screen render');

  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <CustomHeader
        height={windowHeight * 0.12}
        style={{borderBottomWidth: 2, borderBottomColor: '#e6e6e6'}}
        bgAnimated={headerStyle}>
        <View style={styles.header}>
          <Animated.View style={styles.section}>
            <AnimatedPressable
              style={[styles.smallBtn, shadowAnimStyle]}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="times" color="#000" size={16} />
            </AnimatedPressable>
          </Animated.View>
          <View
            style={[
              styles.section,
              {flex: 3, justifyContent: 'center'},
            ]}></View>
          <Animated.View style={styles.section}>
            <AnimatedPressable
              style={[styles.smallBtn, shadowAnimStyle]}
              onPress={() => {
                if (!isFavorite) {
                  sheetRef.current.snapTo(1, 500);
                } else {
                  removeDestinationFromWishlist(post.id, wishlists);
                  setIsFavorite(false);
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Xóa địa điểm thành công',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 40,
                  });
                }
              }}>
              <Icon
                name="heart"
                color={isFavorite ? '#f15454' : '#000'}
                size={16}
              />
            </AnimatedPressable>
          </Animated.View>
        </View>
      </CustomHeader>

      <Animated.ScrollView onScroll={scrollHander}>
        <DetailPost post={post} navigation={navigation} />
      </Animated.ScrollView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, windowHeight * 0.55, windowHeight * 0.9]}
        animatedPosition={bsScrollY}>
        <Pressable
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}
          onPress={() => sheetRef.current.snapTo(0, 1000)}>
          <FontAwesome name="times" size={20} color="black" />
        </Pressable>
        <View style={styles.sheetTitle}>
          <Text style={{fontSize: 18}}>Danh sách yêu thích</Text>
        </View>
        <Divider style={{height: 1, marginTop: 10}} />
        <Pressable
          onPress={() => {
            setDialogVisible(true);
          }}
          style={styles.sheetItem}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              backgroundColor: '#222',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome name="plus" size={30} color="white" />
          </View>
          <Text style={styles.sheetText}>Tạo danh sách yêu thích mới</Text>
        </Pressable>
        <FlatList
          data={wishlists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => {
                sheetRef.current.close();
                setIsFavorite(true);
                addDestinationToWishlist(post.id, item.id);
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1: 'Thêm địa điểm vào yêu thích thành công',
                  visibilityTime: 2000,
                  autoHide: true,
                  bottomOffset: 40,
                });
              }}
              style={styles.sheetItem}
              key={index}>
              <View style={{backgroundColor: '#ebebeb'}}>
                <Image
                  style={styles.sheetImage}
                  source={{uri: item.repImage}}
                />
              </View>
              <Text style={styles.sheetText}>{item.name}</Text>
            </Pressable>
          )}
        />
      </BottomSheet>

      <Dialog
        dialogStyle={styles.dialog}
        animationType="fade"
        visible={dialogVisible}
        onTouchOutside={() => setDialogVisible(false)}>
        <View>
          <Pressable
            onPress={() => {
              setDialogVisible(false);
            }}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              marginTop: 5,
            }}>
            <FontAwesome name="times" size={20} />
          </Pressable>
          <View style={styles.dialogTitle}>
            <Text style={{fontSize: 20}}>Đặt tên cho danh sách</Text>
          </View>
          <Divider style={{height: 1, marginTop: 10, marginHorizontal: -24}} />
          <View style={styles.inputContainer}>
            <Text style={{marginLeft: 10, color: 'grey'}}>Tên</Text>
            <TextInput
              defaultValue={post.name}
              value={newWishlistName}
              onChangeText={text => setNewWishlistName(text)}
              style={styles.wishlistInput}
              numberOfLines={1}
            />
          </View>
          <Text style={{color: 'grey', height: 20}}>Tối đa 50 ký tự</Text>
          <Divider style={{height: 1, marginTop: 20, marginHorizontal: -24}} />
          <Pressable
            disabled={newWishlistName === ''}
            style={styles.createButton}
            onPress={() => {
              addNewWishlist(post.id, post.images[0], newWishlistName);
              setDialogVisible(false);
              sheetRef.current.close();
              setIsFavorite(true);
            }}>
            <Text style={{color: '#ffff', fontSize: 22}}>Tạo</Text>
          </Pressable>
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  smallBtn: {
    // position: 'absolute',
    // top: 30,
    // left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.8,
    shadowRadius: 11.95,
    elevation: 18,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  // container: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   backgroundColor: 'transparent',
  //   width: '100%',
  //   height: 70,
  //   alignItems: 'center',
  //   zIndex: 100,
  // },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    // flex: 1,
    // marginTop: StatusBar.currentHeight,
  },
  section: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sheetItem: {
    width: '80%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  sheetImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  sheetText: {
    marginLeft: 10,
    fontSize: 20,
  },
  dialog: {
    borderRadius: 10,
  },
  dialogTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: 60,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    marginTop: 20,
  },
  wishlistInput: {
    height: 40,
    marginLeft: 8,
    fontSize: 18,
  },
  createButton: {
    backgroundColor: '#000',
    marginTop: 20,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailedPostScreen;
