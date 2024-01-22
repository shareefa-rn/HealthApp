import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import AppStyles from '../AppStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function SignUpScreen({route}) {
  const {userType} = route.params;

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [speciality, setSpeciality] = useState('');

  const handleAddUserProfile = async userCredential => {
    const userObject = {
      uid: userCredential.user.uid,
      username,
      email,
      phone,
      userType,
      location,
      speciality,
    };

    try {
      await firestore()
        .collection('UserProfile')
        .add(userObject)
        .then(() => {
          navigation.navigate('Login');
          showSnackBar('Success! User Account created');
        });
    } catch (error) {
      console.error('Error adding place:', error);
    }
  };

  const handleSubmit = async () => {
    if (email && password) {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          userCredential.user
            .updateProfile({
              displayName: username,
            })
            .then(() => {
              handleAddUserProfile(userCredential);
              setEmail('');
              setPassword('');
              //  showSnackBar('Success! User Account created');
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            showSnackBar('Alert! email address is already in registered!');
          }

          if (error.code === 'auth/invalid-email') {
            showSnackBar('Alert! email address is invalid');
          }

          console.error(error);
        });
    } else {
      showSnackBar('Email and Password are required!');
    }
  };

  const renderDoctorFields = () => {
    if (userType === 'Doctor') {
      return (
        <>
          <View style={AppStyles.marginBottom20}>
            <TextInput
              style={AppStyles.textinputStyel}
              autoCapitalize="none"
              value={speciality}
              placeholder="Enter your Speciality"
              onChangeText={text => setSpeciality(text)}
            />
          </View>
          <View style={AppStyles.marginBottom20}>
            <TextInput
              style={AppStyles.textinputStyel}
              autoCapitalize="none"
              placeholder="Enter your Location"
              onChangeText={text => setLocation(text)}
              value={location}
            />
          </View>
        </>
      );
    }
    return null;
  };

  const showSnackBar = message => {
    Snackbar.show({
      text: message,
      backgroundColor: 'red',
    });
  };

  return (
    <KeyboardAvoidingView
      style={AppStyles.KeyboardAvoidingView}
      behavior="padding">
      <ScrollView>
        <SafeAreaView style={{flex: 1}}>
          <View style={AppStyles.backiconView}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={AppStyles.backiconButton}>
              <ArrowLeftIcon size={20} color="black" />
            </TouchableOpacity>
            <Text style={AppStyles.userTypeTextStyle}>{userType} SignUp</Text>
          </View>
          <View style={AppStyles.topimageview}>
            <Image
              source={require('../../assets/images/signup.png')}
              style={AppStyles.image160}
            />
          </View>
        </SafeAreaView>
        <SafeAreaView style={AppStyles.signupViewWhiteBg}>
          <View style={AppStyles.paddingHorizontal24}>
            <View style={AppStyles.marginBottom20}>
              <Text style={AppStyles.textinputTitle}>Full Name</Text>
              <TextInput
                style={AppStyles.textinputStyel}
                placeholder="Enter Full Name"
                onChangeText={ct => setUserName(ct)}
              />
            </View>
            <View style={AppStyles.marginBottom20}>
              <Text style={AppStyles.textinputTitle}>Contact Number</Text>
              <TextInput
                style={AppStyles.textinputStyel}
                placeholder="Enter Contact Number"
                onChangeText={ct => setPhone(ct)}
              />
            </View>
            <View style={AppStyles.marginBottom20}>
              <Text style={AppStyles.textinputTitle}>Email Address</Text>
              <TextInput
                style={AppStyles.textinputStyel}
                placeholder="Enter Email"
                onChangeText={ct => setEmail(ct)}
              />
            </View>
            <View style={AppStyles.marginBottom20}>
              <Text style={AppStyles.textinputTitle}>Password</Text>
              <TextInput
                style={AppStyles.textinputStyel}
                secureTextEntry
                placeholder="Enter Password"
                onChangeText={ct => setPassword(ct)}
              />
            </View>
            {renderDoctorFields()}

            <TouchableOpacity
              style={AppStyles.roundButtonstyle}
              onPress={handleSubmit}>
              <Text style={AppStyles.roundButtonTextstyle}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={AppStyles.orButtonTextstyle}>Or</Text>

          <View style={AppStyles.topimageview}>
            <Text style={AppStyles.smallGrayText}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login', {userType})}>
              <Text style={AppStyles.smallBlackText}> Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;
