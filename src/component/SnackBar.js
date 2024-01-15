//import liraries
import Snackbar from 'react-native-snackbar';

// create a component
const SnackBar = message => {
  Snackbar.show({
    text: message,
    backgroundColor: 'red',
  });
};
