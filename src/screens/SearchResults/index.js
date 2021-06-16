import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import Post from '../../components/Post';
import {DbContext} from '../../Services/DbProvider';

const SearchResultScreen = props => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {loadDestinations, loadMoreDestinations} = React.useContext(DbContext);

  React.useEffect(() => {
    loadDestinations(1, 1, limit).then(res => {
      setData(res);
      setLastVisible(res[res.length - 1].coordinate.latitude);
      setLoading(false);
    });
  }, []);

  return (
    <View>
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          loadMoreDestinations(1, 1, 5, lastVisible).then(res => {
            setData([...data, ...res]);
            setLastVisible(res[res.length - 1].coordinate.latitude);
            setRefreshing(false);
          });
        }}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator color={'#f15454'} /> : null
        }
        data={data}
        renderItem={({item, index}) => (
          <Post key={(item.name + index).toString()} post={item} />
        )}
        keyExtractor={(item, index) => (item.name + index).toString()}
        refreshing={refreshing}
      />
    </View>
  );
};
export default SearchResultScreen;
