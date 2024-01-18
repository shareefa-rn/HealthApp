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

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
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
                Isabella Joanna
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#111',
                }}>
                Product Manager
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 250,
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
      />
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: () => (
            <FontAwesome name="star" size={20} color="#808080" />
          ),
        }}
        component={HomeScreen}
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
