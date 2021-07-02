import React, {useContext, useEffect, useState} from 'react';
import {AirbnbRating, Avatar} from 'react-native-elements';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Pressable,
} from 'react-native';
import styles, {cmtStyle} from './style';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import {windowWidth} from '../../Utils/Dimention';
import {DbContext} from '../../Services/DbProvider';

// const comments = [
//   {
//     dateCreated: {seconds: 1625237898741},
//     voter: 'Test',
//     avatar: '',
//     comment: 'lorem lorem iifd fdjal dkal jfkewkl fdlal a',
//     star: 3,
//     key: 1,
//   },
//   {
//     dateCreated: {seconds: 1625237898741},
//     voter: 'Test 2',
//     avatar: '',
//     comment: 'lorem lorem iifd fdjal dkal jfkewkl fdlal a',
//     star: 4,
//     key: 2,
//   },
//   {
//     dateCreated: {seconds: 1625237898741},
//     voter: 'Test 2',
//     avatar: '',
//     comment: 'lorem lorem iifd fdjal dkal jfkewkl fdlal a',
//     star: 4,
//     key: 3,
//   },
//   {
//     dateCreated: {seconds: 1625237898741},
//     voter: 'Test 2',
//     avatar: '',
//     comment: 'lorem lorem iifd fdjal dkal jfkewkl fdlal a',
//     star: 4,
//     key: 4,
//   },
//   {
//     dateCreated: {seconds: 1625237898741},
//     voter: 'Test 2',
//     avatar: '',
//     comment:
//       'lorem lorem iifd fdjal dkal jfkewkl fdlal a fda fda da fdajej kfdklaj fldajkj kflkl jdfakl ',
//     star: 4,
//     key: 5,
//   },
// ];

const comment = ({route, navigation}) => {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const {loadComments} = useContext(DbContext);
  const [metadata, setMetadata] = useState(route.params.metadata);

  useEffect(() => {
    let mounted = true;
    loadComments(route.params.postId, 1)
      .then(res => {
        if (mounted) {
          setComments(res);
          setLoading(false);
        }
      })
      .catch(console.error);

    return function () {
      mounted = false;
    };
  }, []);
  //   const destination = useRef(route.params.destination);
  const renderOption = () => {
    // const report = [0, 0, 0, 1, 1];
    // const {report} = route.params;
    return metadata.report
      .slice(0)
      .reverse()
      .map((item, index) => (
        <StarItem
          key={index}
          isSelected={index + 1 === selected}
          star={index + 1}
          amount={item}
          onPress={() => setSelected(index + 1)}
        />
      ));
  };
  // const {metadata} = route.params;
  // const metadata = {avg: 4.5};
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
          <Fonawesome name={'chevron-left'} color={'#000'} size={24} />
        </Pressable>
        <View style={{marginRight: 10, flex: 4}}>
          <Text numberOfLines={1} style={styles.title}>
            {route.params.postName}
          </Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={styles.topMain}></View>
      <View style={styles.main}>
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.control}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: 20,
                  paddingVertical: 10,
                }}>
                <Text style={{marginRight: 10, fontSize: 18, color: 'silver'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#000',
                    }}>
                    {metadata.avg}
                  </Text>
                  /5
                </Text>
                <AirbnbRating
                  selectedColor="#f15454"
                  count={5}
                  defaultRating={metadata.avg}
                  size={22}
                  isDisabled
                  showRating={false}
                />
              </View>
              <View style={styles.option}>{renderOption()}</View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!loading}
          data={loading ? [1, 2, 3, 4] : comments}
          renderItem={
            loading
              ? ({item}) => (
                  <View
                    style={{
                      paddingHorizontal: 20,
                      width: windowWidth - 40,
                      marginVertical: 10,
                    }}>
                    <ContentLoader
                      speed={2}
                      width={windowWidth - 40}
                      height={120}
                      viewBox={`0 0 ${windowWidth - 40} 120`}
                      backgroundColor="#dcdcdc"
                      foregroundColor="#f5f5f5">
                      <Rect x="60" y="8" rx="4" ry="4" width="100" height="8" />
                      <Rect x="60" y="26" rx="4" ry="4" width="70" height="8" />
                      <Rect x="0" y="61" rx="4" ry="4" width="410" height="8" />
                      <Rect x="0" y="83" rx="4" ry="4" width="410" height="8" />
                      <Rect
                        x="0"
                        y="104"
                        rx="4"
                        ry="4"
                        width="178"
                        height="8"
                      />
                      <Circle cx="25" cy="25" r="25" />
                    </ContentLoader>
                  </View>
                )
              : ({item}) => <CommentItem key={item.key} comment={item} />
          }
          style={styles.commentList}
          keyExtractor={loading ? item => item : item => item.key}
        />
      </View>
    </SafeAreaView>
  );
};

const StarItem = props => {
  const {star, amount, isSelected, onPress} = props;
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        overflow: 'hidden',
        height: 36,
        width: 'auto',
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: isSelected ? '#f15454' : 'rgb(240,240,240)',
        backgroundColor: isSelected ? 'rgb(240, 204, 204)' : 'rgb(240,240,240)',
      }}>
      <AirbnbRating
        selectedColor="#f15454"
        count={star}
        defaultRating={star}
        size={14}
        isDisabled
        showRating={false}
      />
      <Text>({amount})</Text>
    </Pressable>
  );
};

const CommentItem = ({comment}) => {
  return (
    <View style={cmtStyle.container}>
      <View style={cmtStyle.header}>
        <Avatar
          rounded
          size="medium"
          source={
            comment.avatar
              ? {uri: comment.avatar}
              : require('../../../assets/images/anonymous.png')
          }
        />
        <View style={cmtStyle.info}>
          <Text
            numberOfLines={1}
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: '500',
              maxWidth: windowWidth * 0.4,
              lineHeight: 26,
            }}>
            {comment.voter}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: 'silver',
              fontSize: 16,
              fontWeight: '500',
              maxWidth: windowWidth * 0.4,
              lineHeight: 26,
            }}>
            {new Date(comment.dateCreated.seconds).toLocaleDateString('vi-VI')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 2,
          }}>
          <AirbnbRating
            selectedColor="#f15454"
            count={comment.star}
            defaultRating={comment.star}
            size={20}
            isDisabled
            showRating={false}
          />
        </View>
      </View>
      <View>
        <Text style={{lineHeight: 25, fontSize: 16}}>{comment.comment}</Text>
      </View>
    </View>
  );
};

export default comment;
