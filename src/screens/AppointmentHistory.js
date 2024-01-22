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

function AppointmentHistory() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [allPlaces, setAllPlaces] = useState([]); // Initial empty array of allPlaces

  useEffect(() => {
    const subscriber = firestore()
      .collection('Appointment')
      .onSnapshot(querySnapshot => {
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
          onPress={() => alert(`Button pressed for ${item.title}`)}>
          <Text style={styles.buttonText}>{item.status}</Text>
        </TouchableOpacity>
      </View>
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

export default AppointmentHistory;
