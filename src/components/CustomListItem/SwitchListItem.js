import React, {useState} from 'react';
import {} from 'react-native';
import {ListItem, Icon, Switch} from 'react-native-elements';

const SwitchListItem = ({
  iconName,
  iconType,
  title,
  onSwitchStateChange,
  initState,
  iconColor,
  switchColor,
}) => {
  const [switchState, setSwitchState] = useState(initState);
  return (
    <ListItem bottomDivider>
      <Icon name={iconName} type={iconType} color={iconColor} />
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
