import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AppStyles from '../AppStyles';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

const DoctorAppointmentScreen = () => {
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [appmtDate, setAppmtDate] = useState('');
  const [appmtTime, setAppmtTime] = useState('');
  const [status, setStatus] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileRef = firestore().collection('Appointment');
        const userSnapshot = await userProfileRef
          .where('patientId', '==', '12456789')
          .get();

        console.log(userSnapshot.docs);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();

          // Update the form values with the fetched data
          setDoctorId(userData.doctorId);
          setPatientId(userData.patientId);
          setCustomMessage(userData.customMessage);
          setAppmtDate(userData.appmtDate);
          setAppmtTime(userData.appmtTime);
          setStatus(userData.status);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array to run only once on mount

  const handleAppointmentBooking = async () => {
    // Perform validation if needed

    // Create an appointment object
    const appointment = {
      doctorId,
      patientId,
      customMessage,
      appmtDate,
      appmtTime,
      status,
    };
    const userPositionRef = firestore().collection('Appointment');
    const userPositionSnapshot = await userPositionRef
      .where('patientId', '==', '12456789')
      .get();

    console.log(userPositionSnapshot.docs);
    // Save the appointment to the database

    if (userPositionSnapshot.empty) {
      // No existing document, add a new one
      await firestore().collection('Appointment').add(appointment);
      Alert.alert('Added: User Position Saved Successfully!');
    } else {
      // Update the existing document
      await userPositionRef
        .doc(userPositionSnapshot.docs[0].id)
        .update(appointment);
      Alert.alert('Updated: Appointment Position Successfully!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={AppStyles.KeyboardAvoidingView}
      behavior="padding">
      <SafeAreaView style={{flex: 1}}>
        <View style={AppStyles.backiconView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={AppStyles.backiconButton}>
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={AppStyles.topimageview}>
          <Image
            source={require('../../assets/images/signup.png')}
            style={AppStyles.image160}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={AppStyles.signupViewWhiteBg}>
        <ScrollView style={{marginTop: 40}}>
          <View style={AppStyles.paddingHorizontal24}>
            <View style={AppStyles.marginBottom20}>
              <Text style={AppStyles.textinputTitle}>Doctor ID:</Text>
              <TextInput
                style={AppStyles.textinputStyel}
                value={doctorId}
                onChangeText={text => setDoctorId(text)}
              />
            </View>
            <View style={AppStyles.marginBottom20}>
              <Text style={AppStyles.textinputTitle}>Patient ID:</Text>
              <TextInput
                style={AppStyles.textinputStyel}
                value={patientId}
                onChangeText={text => setPatientId(text)}
              />
            </View>
            <View style={AppStyles.marginBottom20}>
              <Text style={AppStyles.textinputTitle}>Custom Message:</Text>
              <TextInput
                style={AppStyles.textinputStyel}
                value={customMessage}
                onChangeText={text => setCustomMessage(text)}
              />
            </View>
            <View style={AppStyles.marginBottom20}>
              <Text style={AppStyles.textinputTitle}>Appointment Date:</Text>
              <TextInput
                style={AppStyles.textinputStyel}
                value={appmtDate}
                onChangeText={text => setAppmtDate(text)}
              />
            </View>
            <View style={AppStyles.marginBottom20}>
              <Text style={AppStyles.textinputTitle}>Appointment Time:</Text>
              <TextInput
                style={AppStyles.textinputStyel}
                value={appmtTime}
                onChangeText={text => setAppmtTime(text)}
              />
            </View>
            <View style={AppStyles.marginBottom20}>
              <Text style={AppStyles.textinputTitle}>Status:</Text>
              <TextInput
                style={AppStyles.textinputStyel}
                value={status}
                onChangeText={text => setStatus(text)}
              />
            </View>
            <TouchableOpacity
              style={AppStyles.roundButtonstyle}
              onPress={handleAppointmentBooking}>
              <Text style={AppStyles.roundButtonTextstyle}>
                Update Appointment
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default DoctorAppointmentScreen;
