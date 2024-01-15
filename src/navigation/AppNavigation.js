import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    /* setIsUserLoggedIn(
      user?.data?.created && user?.data?.ttl && user?.data?.userId
        ? true
        : false,
    );*/
    setIsUserLoggedIn(user?._user?.uid ? true : false);
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    //console.log(user.displayName);
    console.log('Current User ', user, isUserLoggedIn);
    setUser(user);
  }

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    // user?.data?.created && user?.data?.ttl && user?.data?.userId ? true : false,
    false,
  );
  if (isUserLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            options={{headerShown: false}}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={LoginScreen}
          />
          <Stack.Screen
            name="SignUp"
            options={{headerShown: false}}
            component={SignUpScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
