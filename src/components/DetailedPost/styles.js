import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  addressContainer: {
    flexDirection: 'row',
  },
  address: {
    marginLeft: 10,
    width: '90%',
    lineHeight: 26,
    fontSize: 20,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    marginLeft: 10,
    width: '90%',
    lineHeight: 26,
    fontSize: 20,
  },
  descriptionTitle: {
    fontSize: 23,
    lineHeight: 40,
    fontWeight: '700',
  },
  description: {
    lineHeight: 28,
    fontSize: 20,
  },
  openTimeContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  openTime: {
    marginLeft: 10,
    width: '90%',
    lineHeight: 26,
    fontSize: 20,
  },
  divider: {
    borderTopColor: 'silver',
  },
});

export default styles;
