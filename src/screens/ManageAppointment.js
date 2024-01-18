import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles';
import {useNavigation} from '@react-navigation/native';

function ManageAppointment() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [allPlaces, setAllPlaces] = useState([]); // Initial empty array of allPlaces
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Appointment')
      // Filter results
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

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image
        source={require('../../assets/images/user.png')}
        style={styles.appointmentsimage}
      />
      <View>
        <Text style={styles.title}>Doctor ID: {item.doctorId}</Text>
        <Text>Patient ID: {item.patientId}</Text>
      </View>
      <View>
        <Text> Date: {item.appmtDate}</Text>
        <Text> Time: {item.appmtTime}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('doctorappointmentscreen')}>
        <Text style={styles.buttonText}>{item.status}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.appointmentscontainer}>
      <FlatList
        data={allPlaces}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

export default ManageAppointment;
