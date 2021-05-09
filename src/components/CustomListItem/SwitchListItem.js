import React, {useState} from 'react';
import {ListItem, Switch} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SwitchListItem = ({
  iconName,
  title,
  onSwitchStateChange,
  initState,
  iconColor,
  switchColor,
}) => {
  const [switchState, setSwitchState] = useState(initState);
  return (
    <ListItem bottomDivider>
      <Icon name={iconName} size={25} color={iconColor} />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <Switch
        onValueChange={value => {
          setSwitchState(value);
          onSwitchStateChange(value);
        }}
        value={switchState}
        color={switchColor}
      />
    </ListItem>
  );
};

export default SwitchListItem;
