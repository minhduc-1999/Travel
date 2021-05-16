import React from 'react';
import {ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextEditListItem = props => {
  const {title, onTextChanged, textValue} = props;
  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <Input
          value={textValue}
          onChangeText={onTextChanged}
          errorStyle={{color: 'red'}}
          errorMessage="ENTER A VALID ERROR HERE"
        />
      </ListItem.Content>
    </ListItem>
  );
};

export default TextEditListItem;
