import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../../theme';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themeColors.bg}}>
      <View style={{flex: 1, justifyContent: 'space-around', marginTop: 4}}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
          }}>
          Let's Get Started!
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../../assets/images/medical-team.png')}
            style={{width: 350, height: 350}}
          />
        </View>
        <View style={{marginVertical: 16}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{
              paddingVertical: 10,
              backgroundColor: 'yellow',
              marginHorizontal: 7,
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'gray',
                textAlign: 'center',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 8,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{fontWeight: 'bold', color: 'yellow'}}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
