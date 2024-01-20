import {Image, SafeAreaView, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import HomeScreen from '../screens/HomeScreen';
import AppointmentHistory from '../screens/AppointmentHistory';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Colors from '../Colors';
import auth from '@react-native-firebase/auth';
import ProfileScreen from '../screens/ProfileScreen';
import ManageAppointment from '../screens/ManageAppointment';
import UpComingAppointment from '../screens/UpcomingAppointment';
import {useEffect, useState} from 'react';
import CreateAppointment from '../screens/CreateAppointment';
import firestore from '@react-native-firebase/firestore';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  const [user, setUser] = useState(undefined);
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
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
          console.log(userData.userType);

          setUserType(userData.userType);
        }
      };

      fetchUserType();
    }
  }, []);

  function onAuthStateChanged(user) {
    console.log('onAuthStateChanged==', auth().currentUser.uid.userType);
    if (auth().currentUser) {
      setEmail(auth().currentUser.email);
      setUserName(auth().currentUser.displayName);
    }

    const fetchUserType = async () => {
      try {
        if (auth().currentUser) {
          const uid = auth().currentUser.uid;
          const userProfileRef = firestore().collection('UserProfile');
          const userSnapshot = await userProfileRef
            .where('uid', '==', uid)
            .get();
          console.log('onAuthStateChanged==', userSnapshot);

          if (!userSnapshot.empty) {
            // User profile exists, update state with existing data
            const userData = userSnapshot.docs[0].data();
            console.log(userData.userType);

            setUserType(userData.userType);
            setUser(user);
          }
        } else {
          setUser(user);
        }
      } catch (error) {
        console.log('Error ? ', error);
      }
    };

    fetchUserType();
  }

  return (
    <Drawer.Navigator
      drawerContent={props => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: Colors.bg,
                borderBottomWidth: 1,
              }}>
              <Image
                source={require('../../assets/images/medical-team.png')}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: 'bold',
                  color: '#111',
                }}>
                Name: {username}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#111',
                }}>
                Email: {email}
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        headerStyle: {
          backgroundColor: Colors.bg,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerLabelStyle: {
          color: '#111',
        },
      }}>
      <Drawer.Screen
        name="ProfileScreen"
        options={{
          drawerLabel: 'ProfileScreen',
          title: 'ProfileScreen',
          drawerIcon: () => (
            <FontAwesome name="star" size={20} color="#808080" />
          ),
        }}
        component={ProfileScreen}
      />
      <Drawer.Screen
        name="UpComing Appointments"
        options={{
          drawerLabel: 'UpComing Appointments',
          title: 'UpComing Appointments',
          drawerIcon: () => (
            <FontAwesome name="star" size={20} color="#808080" />
          ),
        }}
        initialParams={{userType: userType}} // Passing userType as a parameter
        component={UpComingAppointment}
      />
      {userType === 'Patient' && (
        <>
          <Drawer.Screen
            name="CreateAppointment"
            component={CreateAppointment}
            options={{
              drawerLabel: 'Create Appointment',
              title: 'Create Appointment',
              drawerIcon: () => (
                <FontAwesome name="star" size={20} color="#808080" />
              ),
            }}
          />
        </>
      )}
      {userType === 'Doctor' && (
        <>
          <Drawer.Screen
            name="Manage Appointments"
            options={{
              drawerLabel: 'Manage Appointment',
              title: 'Manage Appointment',
              drawerIcon: () => (
                <FontAwesome name="star" size={20} color="#808080" />
              ),
            }}
            component={ManageAppointment}
          />
        </>
      )}
      <Drawer.Screen
        name="AppointmentHistory"
        options={{
          drawerLabel: 'AppointmentHistory',
          title: 'AppointmentHistory',
          drawerIcon: () => (
            <FontAwesome name="star" size={20} color="#808080" />
          ),
        }}
        component={AppointmentHistory}
        initialParams={{userType: userType}} // Passing userType as a parameter
      />

      <Drawer.Screen
        name="Logout"
        options={{
          drawerLabel: 'Logout',
          title: 'Logout',
          drawerIcon: () => (
            <FontAwesome name="star" size={20} color="#808080" />
          ),
        }}
        component={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
