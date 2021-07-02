import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {DbContext} from '../../Services/DbProvider';
import styles from './styles';
import Toast from 'react-native-toast-message';

const MenuWishlist = ({route, navigation}) => {
  const {detail} = route.params;
  const [newName, setNewName] = useState(undefined);
  const {deleteWishlist, updateWishlistName} = useContext(DbContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Thiết lập</Text>
      <Divider style={{height: 1, marginTop: 10}} />
      <View style={styles.inputContainer}>
        <Text style={{marginLeft: 10, color: 'grey', overflow: 'hidden'}}>
          Tên
        </Text>
        <TextInput
          defaultValue={detail.name}
          value={newName}
          onChangeText={text => setNewName(text)}
          style={styles.nameInput}
          numberOfLines={1}
        />
      </View>
      <Text style={{color: 'grey', height: 20, marginTop: 3}}>
        Tối đa 50 ký tự
      </Text>
      <Divider style={{height: 1, marginTop: 10}} />
      <Pressable
        style={styles.deleteButton}
        onPress={() => {
          deleteWishlist(detail.id);
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Xóa danh sách thành công',
            visibilityTime: 2000,
            autoHide: true,
            bottomOffset: 40,
          });
          navigation.navigate('SavedList');
        }}>
        <Text style={styles.deleteText}>Xóa danh sách này</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.botButton}
          onPress={() => {
            navigation.navigate('SavedDetail');
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}>
            Hủy
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (newName === undefined || newName === '') {
              Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Cập nhật thất bại',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 40,
              });
              return;
            }
            updateWishlistName(detail, newName);
            Toast.show({
              type: 'success',
              position: 'bottom',
              text1: 'Cập nhật tên danh sách thành công',
              visibilityTime: 2000,
              autoHide: true,
              bottomOffset: 40,
            });
            navigation.navigate('SavedDetail');
          }}
          style={[
            styles.botButton,
            {backgroundColor: '#000', borderRadius: 10, alignItems: 'center'},
          ]}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#ffff'}}>
            Lưu
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MenuWishlist;
