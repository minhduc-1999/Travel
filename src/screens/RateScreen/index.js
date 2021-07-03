import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import {windowHeight} from '../../Utils/Dimention';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import {AirbnbRating} from 'react-native-elements';
import {DbContext} from '../../Services/DbProvider';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {windowWidth} from '../../Utils/Dimention';
import {Avatar} from 'react-native-elements';

const index = ({route, navigation}) => {
  const [comment, setComment] = useState(route.params.comment);
  const {postComment, loadUserData} = useContext(DbContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [star, setStar] = useState(route.params.star);
  useEffect(async () => {
    let mounted = true;
    loadUserData().then(res => {
      if (mounted) {
        setUser(res);
        setLoading(false);
      }
    });
    return function () {
      mounted = false;
    };
  }, []);
  const {desId, desName, metadata} = route.params;
  const renderUser = () => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          width: windowWidth - 40,
          marginVertical: 30,
        }}>
        {loading ? (
          <ContentLoader
            speed={2}
            width={windowWidth - 40}
            height={90}
            viewBox={`0 0 ${windowWidth - 40} 90`}
            backgroundColor="#dcdcdc"
            foregroundColor="#f5f5f5">
            <Rect x="60" y="8" rx="4" ry="4" width="100" height="8" />
            <Rect x="60" y="30" rx="4" ry="4" width="410" height="8" />
            <Rect x="60" y="52" rx="4" ry="4" width="410" height="8" />
            <Rect x="60" y="74" rx="4" ry="4" width="178" height="8" />
            <Circle cx="25" cy="25" r="25" />
          </ContentLoader>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Avatar
              rounded
              size="medium"
              source={
                user.info.imageUrl
                  ? {uri: user.info.imageUrl}
                  : require('../../../assets/images/anonymous.png')
              }
            />
            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000',
                  fontWeight: '600',
                  lineHeight: 26,
                }}>
                {user.info.firstName + ' ' + user.info.lastName}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: 'grey',
                  marginTop: 5,
                  lineHeight: 26,
                }}>
                Đây là đánh giá công khai và sẽ được hiển thị cho tất cả mọi
                người
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };
  console.log('render rate screen');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <View style={styles.header}>
        <Pressable
          style={{
            flex: 1,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
          }}
          onPress={() => navigation.goBack()}>
          <Fonawesome name={'chevron-left'} color={'#000'} size={20} />
        </Pressable>
        <View style={{marginRight: 10, flex: 4}}>
          <Text numberOfLines={1} style={styles.title}>
            {desName}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            console.log({comment, desId, star, metadata});
            const arg = {
              comment,
              desId,
              star,
              meta: metadata,
            };
            postComment(arg);
            navigation.goBack();
          }}
          style={{flex: 1}}>
          <Text style={{fontSize: 20, color: 'rgb(241,84,84)'}}>Đăng</Text>
        </Pressable>
      </View>
      <View style={styles.topMain}></View>
      <View style={styles.main}>
        {renderUser()}
        <AirbnbRating
          selectedColor="#f15454"
          reviewColor="#f15454"
          count={5}
          reviews={['Kinh khủng', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']}
          defaultRating={star}
          size={40}
          showRating={false}
          onFinishRating={value => {
            setStar(value);
          }}
        />
        <View style={{marginTop: 30}}>
          <TextInput
            onChangeText={text => {
              setComment(text);
            }}
            // defaultValue={comment}
            // onEndEditing={e => {
            //   const input = e.nativeEvent.text;
            //   console.log('[comment ne]', input);
            //   setComment(input);
            // }}
            defaultValue={comment}
            multiline
            placeholder="Mô tả trải nghiệm của bạn"
            style={{
              marginHorizontal: 20,
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'silver',
              fontSize: 18,
            }}
          />
          <Text
            style={{
              marginRight: 20,
              alignSelf: 'flex-end',
              fontSize: 16,
              marginTop: 3,
            }}>
            {comment.split(' ').length - 1}/500
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    zIndex: 100,
    height: 80,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  topMain: {
    width: '100%',
    height: 82,
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
  },
  main: {
    width: '100%',
    height: windowHeight - 80 - StatusBar.currentHeight,
    backgroundColor: 'transparent',
  },
});

export default index;
