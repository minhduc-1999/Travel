import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import DetailPost from '../../components/DetailedPost';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../components/CustomHeader';

const DetailedPostScreen = ({route, navigation}) => {
  const [trans, setTrans] = React.useState(true);
  const {post} = route.params;
  console.log('detail post screen render');
  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor={trans ? 'transparent' : '#fff'}
        barStyle={trans ? 'light-content' : 'dark-content'}
      />
      <CustomHeader
        headerBg={trans ? 'transparent' : '#fff'}
        left={
          <Pressable
            style={styles.back}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="times" color="#000" size={16} />
          </Pressable>
        }
        right={
          <Pressable
            style={styles.back}
            onPress={() => {
              setTrans(!trans);
            }}>
            <Icon name="heart" color="#000" size={16} />
          </Pressable>
        }
      />
      <ScrollView>
        <DetailPost post={post} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  back: {
    // position: 'absolute',
    // top: 30,
    // left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 9,
    // },
    // shadowOpacity: 0.48,
    // shadowRadius: 11.95,
    // elevation: 18,
    backgroundColor: '#fff',
    zIndex: 100,
  },
});

export default DetailedPostScreen;
