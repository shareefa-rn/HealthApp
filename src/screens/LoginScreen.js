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
import {themeColors} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import FirebaseAuth from '@react-native-firebase/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (email && password) {
      FirebaseAuth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
          showSnackBar('Success! Logged into Application');

          navigation.navigate('Home');
          console.log(data);
        })
        .catch(err => {
          console.log(err);
          showSnackBar('Email and Password wrong!');
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
            source={require('../../assets/images/login.png')}
            style={{width: 200, height: 200}}
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
              placeholder="email"
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
              placeholder="password"
              onChangeText={ct => setPassword(ct)}
            />
          </View>
          <TouchableOpacity style={{alignItems: 'flex-end'}}>
            <Text style={{color: 'gray', marginBottom: 5}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
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
              Login
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
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{fontWeight: 'bold', color: 'black'}}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
