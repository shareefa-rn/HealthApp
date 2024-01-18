import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import auth from '@react-native-firebase/auth';
import DrawerNavigation from './DrawerNavigation';
import 'react-native-gesture-handler';
import DoctorAppointmentScreen from '../screens/DoctorAppointmentScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
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
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="DrawerNavigation"
            component={DrawerNavigation}
          />
          <Stack.Screen
            name="doctorappointmentscreen"
            options={{headerShown: false}}
            component={DoctorAppointmentScreen}
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
