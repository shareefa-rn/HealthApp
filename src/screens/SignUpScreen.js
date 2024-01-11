import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {themeColors} from '../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: themeColors.bg}}
      behavior="padding">
      <SafeAreaView style={{flex: 1}}>
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
          backgroundColor: 'white',
          flex: 3,
        }}>
        <View style={{paddingHorizontal: 24, paddingTop: 4}}>
          <View style={{marginBottom: 20}}>
            <Text style={{color: 'gray', marginLeft: 4}}>Full Name</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: 'lightgray',
                borderRadius: 20,
                marginTop: 5,
              }}
              value="john snow"
              placeholder="Enter Name"
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={{color: 'gray', marginLeft: 4}}>Email Address</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: 'lightgray',
                borderRadius: 20,
                marginTop: 5,
              }}
              value="john@gmail.com"
              placeholder="Enter Email"
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
              value="test12345"
              placeholder="Enter Password"
            />
          </View>
          <TouchableOpacity
            style={{
              padding: 16,
              backgroundColor: 'yellow',
              borderRadius: 20,
            }}>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 16,
          }}></View>
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
