import React from 'react';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomListItem = props => {
  const {showChervon, iconName, title, onPress, ...rest} = props;
  return (
    <ListItem bottomDivider onPress={onPress}>
      <Icon name={iconName} size={25} />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron size={25} />
    </ListItem>
  );
};

export default CustomListItem;
