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
import {Image} from 'react-native-svg';

// create a component
const HomeScreen = () => {
  const handleSubmit = async () => {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <SafeAreaView styles={styles.container} behavior="padding">
      <View style={{flex: 1}}>
        <View styles={styles.subContainer}>
          <TouchableOpacity>
            <Image
              style={styles.btnImage}
              source={require('../../assets/images/medical-team.png')}></Image>
          </TouchableOpacity>
          <Text>
            Hay,<Text>James</Text>
          </Text>
          <Image
            style={styles.profileImage}
            source={require('../../assets/images/medical-team.png')}></Image>
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnImage: {
    width: 21,
    height: 21,
  },
  profileImage: {
    width: 21,
    height: 21,
  },
  subContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default HomeScreen;
