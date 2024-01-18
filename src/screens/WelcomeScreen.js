import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import PersistanceHelper from '../helper/PersistanceHelper';
import Colors from '../Colors';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(undefined);
  const USER_DOCTOR = 'Doctor';
  const USER_PATIENT = 'Patient';
  const genderOptions = ['Doctor', 'Patient', 'Other'];

  const onSubmit = () => {
    if (selectedGender !== undefined && selectedGender !== null) {
      switch (selectedGender) {
        case USER_DOCTOR:
          PersistanceHelper.setUser(selectedGender);
          navigation.navigate('SignUp');
        case USER_PATIENT:
          return <LoginScreen />;
        default:
          return null;
      }
    } else {
      Alert.alert('Please select one categories');
    }
  };

  const RadioButton = ({options, selectedOption, onSelect}) => {
    return (
      <View style={styles.radioButtonContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={styles.radioButton}
            onPress={() => onSelect(option)}>
            <Text
              style={
                option === selectedOption
                  ? styles.selectedText
                  : styles.unselectedText
              }>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bg}}>
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
            style={{width: 250, height: 250}}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Select Categorie from below:</Text>
          <RadioButton
            options={genderOptions}
            selectedOption={selectedGender}
            onSelect={option => setSelectedGender(option)}
          />

          <Text style={styles.selectedText}>
            Selected Categorie: {selectedGender}
          </Text>
        </View>
        <View style={{marginVertical: 16}}>
          <TouchableOpacity
            onPress={onSubmit}
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
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 7,
    borderRadius: 20,
  },
  selectedText: {
    fontSize: 18,

    color: 'white',
    fontWeight: 'bold',
  },
  unselectedText: {
    color: 'black',
  },
});
