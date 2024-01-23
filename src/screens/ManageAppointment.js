import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

function ManageAppointment() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [allPlaces, setAllPlaces] = useState([]); // Initial empty array of allPlaces
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    console.log('All auth==', auth().currentUser);

    const subscriber = firestore()
      .collection('Appointment')
      .where('doctorId', '==', auth().currentUser.uid)
      .where('status', '==', 'pending')
      .get()
      .then(querySnapshot => {
        const allPlaces = [];

        querySnapshot.forEach(documentSnapshot => {
          allPlaces.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log('All place', allPlaces);

        setAllPlaces(allPlaces);
        //  setLoading(false);
      });
    setLoading(false);
    // Unsubscribe from events when no longer in use
    return () => subscriber;
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  const handleAction = async status => {
    try {
      const userProfileRef = firestore().collection('Appointment');
      const userSnapshot = await userProfileRef
        .where('doctorId', '==', auth().currentUser.uid)
        .where('status', '==', 'pending')
        .get();

      if (selectedAppointment && selectedAppointment.doctorId) {
        // Update appointment status and remove from the list
        userProfileRef
          .doc(userSnapshot.docs[0].id)
          .update({...selectedAppointment, status});

        // Close the modal
        setModalVisible(false);
      } else {
        console.error(
          'Selected appointment or its ID is invalid:',
          selectedAppointment,
        );
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={{flex: 0.5}}>
        <Image
          source={require('../../assets/images/user.png')}
          style={styles.appointmentsimage}
        />
      </View>
      <View style={{flex: 2.5}}>
        <Text style={styles.title}>Doctor Name: {item.doctorName}</Text>
        <Text>Patient Name: {item.patientName}</Text>
        <Text>Date: {item.appmtDate}</Text>
        <Text>Time: {item.appmtTime}</Text>
        <Text>Message: {item.customMessage}</Text>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedAppointment(item);
            setModalVisible(true);
          }}>
          <Text style={styles.buttonText}>{item.status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.appointmentscontainer}>
      <FlatList
        data={allPlaces}
        keyExtractor={(item, index) => index.toString()} // or use a unique ID from your data
        renderItem={renderItem}
        ListEmptyComponent={<Text>No pending appointments</Text>}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={InlineStyles.modalContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 8,
            }}>
            <Button
              title="Reject"
              onPress={() => handleAction('rejected')} // Pass a function reference
            />
            <Button
              title="Approve"
              onPress={() => handleAction('approved')} // Pass a function reference
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const InlineStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default ManageAppointment;
