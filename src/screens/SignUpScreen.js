import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../../theme';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';

function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

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
              setEmail('');
              setPassword('');
              showSnackBar('Success! User Account created');
              navigation.navigate('Login');
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

  const showSnackBar = message => {
    Snackbar.show({
      text: message,
      backgroundColor: 'red',
    });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: themeColors.bg}}
      behavior="padding">
      <SafeAreaView style={{flex: 1.5}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'yellow',
              padding: 10,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              marginLeft: 4,
            }}>
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../../assets/images/signup.png')}
            style={{width: 165, height: 110}}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          flex: 2.5,
          backgroundColor: 'white',
        }}>
        <View style={{paddingHorizontal: 24, paddingTop: 24}}>
          <View style={{marginBottom: 20}}>
            <Text style={{color: 'gray', marginLeft: 4}}>Email Address</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: 'lightgray',
                borderRadius: 20,
                marginTop: 5,
              }}
              placeholder="Enter Email"
              onChangeText={ct => setEmail(ct)}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={{color: 'gray', marginLeft: 4}}>Password</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: 'lightgray',
                borderRadius: 20,
                marginTop: 5,
              }}
              secureTextEntry
              placeholder="Enter Password"
              onChangeText={ct => setPassword(ct)}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={{color: 'gray', marginLeft: 4}}>Full Name</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: 'lightgray',
                borderRadius: 20,
                marginTop: 5,
              }}
              placeholder="Enter Full Name"
              onChangeText={ct => setUserName(ct)}
            />
          </View>

          <TouchableOpacity
            style={{
              padding: 16,
              backgroundColor: 'yellow',
              borderRadius: 20,
            }}
            onPress={handleSubmit}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'gray',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'gray',
            paddingTop: 16,
          }}>
          Or
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: 'gray', fontWeight: 'bold'}}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{fontWeight: 'bold', color: 'black'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;
