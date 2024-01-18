import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Colors from '../Colors';

const DoctorAppointmentScreen = () => {
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [appmtDate, setAppmtDate] = useState('');
  const [appmtTime, setAppmtTime] = useState('');
  const [status, setStatus] = useState('');

  const handleAppointmentBooking = () => {
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

    // Save the appointment to the database
    firestore()
      .collection('Appointment')
      .add(appointment)
      .then(() => {
        console.log('Appointment booked successfully!');
        // You can navigate to another screen or perform other actions upon success
      })
      .catch(error => {
        console.error('Error booking appointment:', error);
        // Handle errors appropriately
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
        <Text style={styles.label}>Doctor ID:</Text>
        <TextInput
          style={styles.input}
          value={doctorId}
          onChangeText={text => setDoctorId(text)}
        />

        <Text style={styles.label}>Patient ID:</Text>
        <TextInput
          style={styles.input}
          value={patientId}
          onChangeText={text => setPatientId(text)}
        />

        <Text style={styles.label}>Custom Message:</Text>
        <TextInput
          style={styles.input}
          value={customMessage}
          onChangeText={text => setCustomMessage(text)}
        />

        <Text style={styles.label}>Appointment Date:</Text>
        <TextInput
          style={styles.input}
          value={appmtDate}
          onChangeText={text => setAppmtDate(text)}
        />

        <Text style={styles.label}>Appointment Time:</Text>
        <TextInput
          style={styles.input}
          value={appmtTime}
          onChangeText={text => setAppmtTime(text)}
        />

        <Text style={styles.label}>Status:</Text>
        <TextInput
          style={styles.input}
          value={status}
          onChangeText={text => setStatus(text)}
        />

        <TouchableOpacity onPress={handleAppointmentBooking}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Update Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
