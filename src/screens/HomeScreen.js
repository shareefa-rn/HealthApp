//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {themeColors} from '../../theme';

// create a component
const HomeScreen = () => {
  const handleSubmit = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: themeColors.bg}}
      behavior="padding">
      <SafeAreaView
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          flex: 2.5,
          backgroundColor: 'white',
        }}>
        <View style={{paddingHorizontal: 24, paddingTop: 24, marginBottom: 20}}>
          <TouchableOpacity
            style={{padding: 16, backgroundColor: 'yellow', borderRadius: 20}}
            onPress={handleSubmit}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'gray',
              }}>
              Signout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default HomeScreen;
