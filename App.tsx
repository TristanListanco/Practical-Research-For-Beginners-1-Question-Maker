import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './src/routes/AuthStackNavigator';
import auth from '@react-native-firebase/auth';
import AppStackNavigator from './src/routes/AppStackNavigator';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onAuthStateChanged = async (user:any) => {
    await setCurrentUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {currentUser ?  <AuthStackNavigator /> :  <AppStackNavigator />}
    </NavigationContainer>
  );
};

export default App;