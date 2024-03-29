import {StyleSheet} from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  languagesList: {
    flex: 1,
    margin: 80,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#6258e8',
  },
  languageButton: {
    padding: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  langName: {
    fontSize: 16,
    color: 'white',
  },
  markerIcon: {
    width: 40,
    height: 40,
  },
  iconSize: {
    fontSize: 30,
  },
  errorStyle: {
    marginHorizontal: 10,
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
    margin: 5,
    borderColor: '#bee6fe',
    backgroundColor: '#eaf7fd',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'stretch',
    margin: 10,
    padding: 10,
    alignContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  logoutDrawerItem: {
    borderRadius: 5,
  },
  touchableText: {
    height: 40,
    marginHorizontal: 10,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textview: {
    height: 40,
    flex: 4,
    marginHorizontal: 10,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInuput: {
    alignItems: 'center',
    textAlign: 'left',
    justifyContent: 'center',
    backgroundColor: 'pink',
    height: 40,
    width: 100,
    margin: 10,
    padding: 5,
    flex: 1,
  },
  view: {
    marginHorizontal: 10,
    height: 40,
    backgroundColor: 'lightgreen',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 66,
    height: 58,
    borderRadius: 400 / 2,
  },
  textHeadingStyle: {
    marginTop: 30,
    fontSize: 40,
    color: '#0250a3',
    fontWeight: 'bold',
  },
  profileContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: Colors.black,
    borderWidth: 3,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  genderContainer: {
    paddingVertical: 10,
    marginHorizontal: 7,
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 16,
  },
  genderSelectedCell: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellow,
  },
  genderCell: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /** Doctor App values */
  appointments: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flex: 1,
  },
  appointmentscontainer: {
    flex: 1,
    paddingTop: 10,
  },
  appointmentsimage: {
    width: 18,
    height: 18,
  },
  title: {
    fontSize: 14,
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
