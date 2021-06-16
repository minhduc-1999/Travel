import React, {useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Post from '../../components/Post';
import {DbContext} from '../../Services/DbProvider';

const SearchResultScreen = props => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const {loadDestinations, loadMoreDestinations} = React.useContext(DbContext);

  React.useEffect(() => {
    let mounted = true;
    loadDestinations(1, 1, limit).then(res => {
      if (mounted) {
        if (res.length) {
          setData(res);
          setLastVisible(res[res.length - 1].coordinate.latitude);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);
  console.log('search result screen render');
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View>
        <FlatList
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (hasMore)
              loadMoreDestinations(1, 1, 5, lastVisible).then(res => {
                if (res.length) {
                  setData([...data, ...res]);
                  setLastVisible(res[res.length - 1].coordinate.latitude);
                } else {
                  setHasMore(false);
                }
                setRefreshing(false);
              });
          }}
          ListFooterComponent={() =>
            loading ? (
              <ActivityIndicator
                style={{marginVertical: 20}}
                color={'#f15454'}
              />
            ) : null
          }
          data={data}
          renderItem={({item}) => <Post key={item.id} post={item} />}
          keyExtractor={item => item.id}
          refreshing={refreshing}
        />
      </View>
    </SafeAreaView>
  );
};
export default SearchResultScreen;
