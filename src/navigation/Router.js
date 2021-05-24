import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {AuthContext} from './AuthProvider';
import auth from '@react-native-firebase/auth';

const Router = props => {
  const {userAcc, setUserAcc} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUserAcc(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subcriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subcriber;
  }, []);

  if (initializing) return null; //flash screen

  return (
    <NavigationContainer>
      {userAcc ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
