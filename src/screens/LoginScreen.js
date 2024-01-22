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
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import AppStyles from '../AppStyles';

function LoginScreen({route}) {
  const {userType} = route.params;

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //sanap@gmail.com -- patient
  //sana2@gmail.com -- dr
  //drsana@gmail.com -- dr
  //test1234

  const handleSubmit = async () => {
    if (email && password) {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
          showSnackBar('Success! Logged into Application');

          console.log('login success', data);
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
      style={AppStyles.KeyboardAvoidingView}
      behavior="padding">
      <SafeAreaView style={{flex: 1.5}}>
        <View style={AppStyles.backiconView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={AppStyles.backiconButton}>
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
          <Text style={AppStyles.userTypeTextStyle}>{userType} Login</Text>
        </View>
        <View style={AppStyles.topimageview}>
          <Image
            source={require('../../assets/images/login.png')}
            style={AppStyles.image200}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={AppStyles.signupViewWhiteBg}>
        <View style={AppStyles.paddingHorizontal24}>
          <View style={AppStyles.marginBottom20}>
            <Text style={AppStyles.textinputTitle}>Email Address</Text>
            <TextInput
              style={AppStyles.textinputStyel}
              placeholder="email"
              onChangeText={ct => setEmail(ct)}
            />
          </View>
          <View style={AppStyles.marginBottom20}>
            <Text style={AppStyles.textinputTitle}>Password</Text>
            <TextInput
              style={AppStyles.textinputStyel}
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
            style={AppStyles.roundButtonstyle}
            onPress={handleSubmit}>
            <Text style={AppStyles.roundButtonTextstyle}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={AppStyles.orButtonTextstyle}>Or</Text>

        <View style={AppStyles.topimageview}>
          <Text style={AppStyles.smallGrayText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp', {userType})}>
            <Text style={AppStyles.smallBlackText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
