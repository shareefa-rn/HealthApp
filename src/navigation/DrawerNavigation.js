import {Image, SafeAreaView, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import HomeScreen from '../screens/HomeScreen';
import AppointmentHistory from '../screens/AppointmentHistory';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import Colors from '../Colors';
import auth from '@react-native-firebase/auth';
import ProfileScreen from '../screens/ProfileScreen';
import ManageAppointment from '../screens/ManageAppointment';
import UpComingAppointment from '../screens/UpcomingAppointment';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import CreateAppointmentScreen from '../screens/CreateAppointmentScreen';

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
    console.log(auth().currentUser.uid);
    let isMounted = true;

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

          if (isMounted) {
            console.log('user data==', userData.userType);

            setUser(userData);
            setUserType(userData.userType);
          }
        }
      };

      fetchUserType();
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

  function onAuthStateChanged(user) {
    console.log('auth().currentUser==', auth().currentUser);
    console.log('().user==', user);

    if (auth().currentUser) {
      setEmail(auth().currentUser.email);
      setUserName(auth().currentUser.displayName);
    }

    async function fetchUserType() {
      try {
        if (auth().currentUser) {
          const uid = auth().currentUser.uid;
          const userProfileRef = firestore().collection('UserProfile');
          console.log('UserSnapshot: userProfileRef', userProfileRef);

          const userSnapshot = await userProfileRef
            .where('uid', '==', auth().currentUser.uid)
            .get();
          console.log('UserSnapshot:', userSnapshot.docs);

          if (!userSnapshot.empty) {
            // User profile exists, update state with existing data
            const userData = userSnapshot.docs[0].data();
            console.log('UserType:', userData.userType);

            setUserType(userData.userType);
            setUser(user);
          }
        } else {
          setUser(user);
        }
      } catch (error) {
        console.log('Error fetching user type:', error);
      }
    }

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
            <AntDesign name="profile" size={20} color="#808080" />
          ),
        }}
        initialParams={{userType: userType}} // Passing userType as a parameter
        component={ProfileScreen}
      />
      <Drawer.Screen
        name="UpComing Appointments"
        options={{
          drawerLabel: 'UpComing Appointments',
          title: 'UpComing Appointments',
          drawerIcon: () => (
            <MaterialIcons name="upcoming" size={20} color="#808080" />
          ),
        }}
        initialParams={{userType: userType}} // Passing userType as a parameter
        component={UpComingAppointment}
      />

      {userType === 'Doctor' && (
        <Drawer.Screen
          name="Manage Appointments"
          options={{
            drawerLabel: 'Manage Appointment',
            title: 'Manage Appointment',
            drawerIcon: () => (
              <MaterialIcons name="manage-accounts" size={20} color="#808080" />
            ),
          }}
          component={ManageAppointment}
        />
      )}
      {userType === 'Patient' && (
        <Drawer.Screen
          name="CreateAppointmentScreen"
          component={CreateAppointmentScreen}
          options={{
            drawerLabel: 'Create Appointment',
            title: 'Create Appointment',
            drawerIcon: () => (
              <FontAwesome name="pencil" size={20} color="#808080" />
            ),
          }}
        />
      )}
      <Drawer.Screen
        name="AppointmentHistory"
        component={AppointmentHistory}
        initialParams={{userType: userType}}
        options={{
          drawerLabel: 'AppointmentHistory',
          title: 'AppointmentHistory',
          drawerIcon: () => (
            <MaterialIcons name="history" size={20} color="#808080" />
          ),
        }}
      />

      <Drawer.Screen
        name="Logout"
        options={{
          drawerLabel: 'Logout',
          title: 'Logout',
          drawerIcon: () => (
            <AntDesign name="logout" size={20} color="#808080" />
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
