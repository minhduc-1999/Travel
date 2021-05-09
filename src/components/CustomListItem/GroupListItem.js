import React from 'react';
import {ListItem, Icon} from 'react-native-elements';

const CustomListItem = props => {
  const {showChervon, iconName, iconType, title, onPress, ...rest} = props;
  return (
    <ListItem bottomDivider onPress={onPress}>
      <Icon name={iconName} type={iconType} />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron size={25} />
    </ListItem>
  );
};

export default CustomListItem;
