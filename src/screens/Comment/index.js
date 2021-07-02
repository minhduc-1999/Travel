import React, {useState} from 'react';
import {Rating, Avatar} from 'react-native-elements';

import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Pressable,
  TextInput,
} from 'react-native';
import styles, {cmtStyle} from './style';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import GgIcon from 'react-native-vector-icons/MaterialIcons';
import {windowWidth} from '../../Utils/Dimention';
const comment = ({route, navigation}) => {
  const [selected, setSelected] = useState(3);
  //   const destination = useRef(route.params.destination);
  const renderOption = () => {
    return [5, 4, 3, 2, 1].map(item => (
      <StarItem
        key={item}
        isSelected={item === selected}
        star={item}
        amount={item}
        onPress={() => setSelected(item)}
      />
    ));
  };
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
            Name
          </Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
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
                    3.3
                  </Text>
                  /5
                </Text>
                <Rating
                  imageSize={22}
                  ratingColor="#f15454"
                  readonly
                  fractions={1}
                  startingValue={3.3}
                  type="custom"
                />
              </View>
              <View style={styles.option}>{renderOption()}</View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({item}) => <CommentItem key={item} />}
          style={styles.commentList}
          keyExtractor={item => item}
        />
      </View>
      <View style={styles.commentInput}>
        <TextInput
          placeholder="Write comments..."
          multiline
          style={styles.input}></TextInput>
        <Pressable style={[styles.send]}>
          <GgIcon name={'send'} size={30} color={'#435be0'} />
        </Pressable>
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
      <Rating
        imageSize={14}
        ratingColor="#f15454"
        tintColor={isSelected ? 'rgb(240, 204, 204)' : 'rgb(240,240,240)'}
        readonly
        ratingCount={star}
        startingValue={star}
        type="custom"
      />
      <Text>({amount})</Text>
    </Pressable>
  );
};

const CommentItem = () => {
  return (
    <View style={cmtStyle.container}>
      <View style={cmtStyle.header}>
        <Avatar
          rounded
          size="medium"
          source={require('../../../assets/images/anonymous.png')}
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
            Name here f jalkfj dlajk fdal fkdlskl
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
            {new Date().toLocaleDateString('vi-VI')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 2,
          }}>
          <Rating
            imageSize={20}
            ratingColor="#f15454"
            tintColor="#fff"
            ratingBackgroundColor="#fff"
            readonly
            ratingCount={4}
            startingValue={4}
            type="custom"
          />
        </View>
      </View>
      <View>
        <Text style={{lineHeight: 25, fontSize: 16}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
      </View>
    </View>
  );
};

export default comment;
