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
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AppStyles from '../AppStyles';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = ({route}) => {
  const {userId} = auth().currentUser.uid;
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [userType, setUserType] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    console.log(auth().currentUser.uid);

    if (auth().currentUser) {
      const fetchUserType = async () => {
        const userProfileRef = firestore().collection('UserProfile');
        const userSnapshot = await userProfileRef
          .where('uid', '==', auth().currentUser.uid)
          .get();
        console.log('snap==', userSnapshot);

        if (!userSnapshot.empty) {
          // User profile exists, update state with existing data
          const userData = userSnapshot.docs[0].data();
          console.log('userdata=123=', userData);
          console.log('userdata=123=', auth().currentUser.uid);

          // Update the form values with the fetched data
          setUserName(userData.username);
          setEmail(userData.email);
          setPhone(userData.phone);

          setSpeciality(userData.speciality);
          setLocation(userData.location);
          setUserType(userData.userType);

          //  {"email": "Sana2@gmail.com", "location": "london", "phone": "099898988",
          // "speciality": "gynaco", "uid": "yrupdak0d4UlVXaJ0OIZdZbcOLI3",
          //"userType": "Doctor", "username": "Sana"}
        }
      };

      fetchUserType();
    }
  }, []);

  const addQualification = async () => {
    // Add qualification to the Qualification collection
    const qualification = {degreeName, institute, passingYear};
    const userProfile = {
      email: email,
      location: location,
      phone: phone,
      speciality: speciality,
      uid: auth().currentUser.uid,
      userType: userType,
      username: username,
    };
    const userProfileRef = firestore().collection('UserProfile');
    const userSnapshot = await userProfileRef
      .where('uid', '==', auth().currentUser.uid)
      .get();

    if (userSnapshot.empty) {
      // No existing document, add a new one
      await firestore()
        .collection('UserProfile')
        .add({...userProfile, ...qualification}); // Merge userProfile and qualification into a single object
      Alert.alert('Added: User Position Saved Successfully!');
    } else {
      // User profile exists, update state with existing data
      console.log('userProfile==', userProfile);
      console.log('qualification==', qualification);

      // Merge userProfile and qualification into a single object before updating the document
      const updatedData = {...userProfile, ...qualification};

      // Update the existing document
      await userProfileRef.doc(userSnapshot.docs[0].id).update(updatedData);
      Alert.alert('Updated: Appointment Position Successfully!');
      setQualificationModalVisible(false);
    }
  };

  const addExperience = async () => {
    // Add experience to the Experience collection
    const experience = {companyName, position, startYear, endYear};

    const userProfile = {
      email: email,
      location: location,
      phone: phone,
      speciality: speciality,
      uid: auth().currentUser.uid,
      userType: userType,
      username: username,
    };
    const userProfileRef = firestore().collection('UserProfile');
    const userSnapshot = await userProfileRef
      .where('uid', '==', auth().currentUser.uid)
      .get();

    if (userSnapshot.empty) {
      // No existing document, add a new one
      await firestore()
        .collection('UserProfile')
        .add({...userProfile, ...experience}); // Merge userProfile and qualification into a single object
      Alert.alert('Added: User Position Saved Successfully!');
      setExperienceModalVisible(false);
    } else {
      // User profile exists, update state with existing data
      console.log('userProfile==', userProfile);
      console.log('experience==', experience);

      // Merge userProfile and qualification into a single object before updating the document
      const updatedData = {...userProfile, ...experience};

      // Update the existing document
      await userProfileRef.doc(userSnapshot.docs[0].id).update(updatedData);
      Alert.alert('Updated: Appointment Position Successfully!');
      setExperienceModalVisible(false);
    }
  };
  const handleAppointmentBooking = async () => {};

  return (
    <SafeAreaView style={AppStyles.signupViewWhiteBg}>
      <ScrollView style={{marginTop: 40}}>
        <View style={AppStyles.paddingHorizontal24}>
          <View style={AppStyles.marginBottom20}>
            <Text style={AppStyles.textinputTitle}>UserName:</Text>
            <TextInput
              style={AppStyles.textinputStyel}
              value={username}
              onChangeText={text => setUserName(text)}
            />
          </View>
          <View style={AppStyles.marginBottom20}>
            <Text style={AppStyles.textinputTitle}>Email Address:</Text>
            <TextInput
              style={AppStyles.textinputStyel}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={AppStyles.marginBottom20}>
            <Text style={AppStyles.textinputTitle}>Contact Number:</Text>
            <TextInput
              style={AppStyles.textinputStyel}
              value={phone}
              onChangeText={text => setPhone(text)}
            />
          </View>
          <View style={AppStyles.marginBottom20}>
            <Text style={AppStyles.textinputTitle}>Location:</Text>
            <TextInput
              style={AppStyles.textinputStyel}
              value={location}
              onChangeText={text => setLocation(text)}
            />
          </View>
          <View style={AppStyles.marginBottom20}>
            <Text style={AppStyles.textinputTitle}>Speciality:</Text>
            <TextInput
              style={AppStyles.textinputStyel}
              value={speciality}
              onChangeText={text => setSpeciality(text)}
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
