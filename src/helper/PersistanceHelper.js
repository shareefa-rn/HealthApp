import AsyncStorage from '@react-native-async-storage/async-storage';

class PersistanceHelper {
  accessToken = undefined;

  setUser = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  removeUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.log(error);
    }
  };

  removeData = async () => {
    try {
      const savedUser = await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
}
export default new PersistanceHelper();
