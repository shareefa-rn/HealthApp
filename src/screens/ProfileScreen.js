import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AppStyles from '../AppStyles';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = ({route}) => {
  const {userId} = '8w9NSNRrgTZqkNZ9dZeR1ZWMOv82';
  const [user, setUser] = useState(null);

  const [qualificationModalVisible, setQualificationModalVisible] =
    useState(false);
  const [companyName, setCompanyName] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [position, setPosition] = useState('');

  const [experienceModalVisible, setExperienceModalVisible] = useState(false);
  const [degreeName, setDegreeName] = useState('');
  const [institute, setInstitute] = useState('');
  const [passingYear, setPassingYear] = useState('');

  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [appmtDate, setAppmtDate] = useState('');
  const [appmtTime, setAppmtTime] = useState('');
  const [status, setStatus] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user details from Firestore based on userId
    const fetchUserProfile = async () => {
      try {
        const userProfileRef = firestore()
          .collection('DoctorUserProfile')
          .doc(userId);
        const userSnapshot = await userProfileRef.get();

        if (userSnapshot.exists) {
          setUser(userSnapshot.data());
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const addQualification = () => {
    // Add qualification to the Qualification collection
    const qualification = {degreeName, institute, passingYear};

    firestore()
      .collection('Qualification')
      .add({
        doctorId: userId,
        ...qualification,
      })
      .then(() => {
        setQualificationModalVisible(false);
        // Refresh user details after adding qualification
        fetchUserProfile();
      })
      .catch(error => {
        console.error('Error adding qualification:', error);
      });
  };

  const addExperience = () => {
    // Add experience to the Experience collection
    const experience = {companyName, position, startYear, endYear};

    firestore()
      .collection('Experience')
      .add({
        doctorId: userId,
        ...experience,
      })
      .then(() => {
        setExperienceModalVisible(false);
        // Refresh user details after adding experience
        fetchUserProfile();
      })
      .catch(error => {
        console.error('Error adding experience:', error);
      });
  };
  const handleAppointmentBooking = async () => {};

  return (
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
          {/* Button to add qualification */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setQualificationModalVisible(true)}>
            <Text style={styles.buttonText}>Add Qualification</Text>
          </TouchableOpacity>

          {/* Button to add experience */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setExperienceModalVisible(true)}>
            <Text style={styles.buttonText}>Add Experience</Text>
          </TouchableOpacity>
          {/* Qualification Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={qualificationModalVisible}
            onRequestClose={() => setQualificationModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Qualification</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Degree Name"
                  value={degreeName}
                  onChangeText={text => setDegreeName(text)}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Institute"
                  value={institute}
                  onChangeText={text => setInstitute(text)}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Passing Year"
                  value={passingYear}
                  onChangeText={text => setPassingYear(text)}
                />
                <Button title="Add" onPress={addQualification} />
                <Button
                  title="Cancel"
                  onPress={() => setQualificationModalVisible(false)}
                />
              </View>
            </View>
          </Modal>

          {/* Experience Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={experienceModalVisible}
            onRequestClose={() => setExperienceModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Experience</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Company Name"
                  value={companyName}
                  onChangeText={text => setCompanyName(text)}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Position"
                  value={position}
                  onChangeText={text => setPosition(text)}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Start Year"
                  value={startYear}
                  onChangeText={text => setStartYear(text)}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="End Year"
                  value={endYear}
                  onChangeText={text => setEndYear(text)}
                />

                {/* Add similar TextInput components for companyName,
                 position, startYear, endYear */}
                <Button title="Add" onPress={addExperience} />
                <Button
                  title="Cancel"
                  onPress={() => setExperienceModalVisible(false)}
                />
              </View>
            </View>
          </Modal>

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
  );
};

const styles = StyleSheet.create({
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

export default ProfileScreen;
