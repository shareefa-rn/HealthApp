import {StyleSheet} from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  KeyboardAvoidingView: {flex: 1, backgroundColor: Colors.bg},
  backiconView: {flexDirection: 'row', justifyContent: 'flex-start'},
  backiconButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 4,
  },
  topimageview: {flexDirection: 'row', justifyContent: 'center'},
  image160: {width: 160, height: 160},
  image200: {width: 200, height: 200},
  signupViewWhiteBg: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 3,
    backgroundColor: 'white',
  },
  paddingHorizontal24: {paddingHorizontal: 24},
  marginBottom20: {marginBottom: 20},
  textinputTitle: {color: 'gray', marginLeft: 4},
  textinputStyel: {
    padding: 16,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    marginTop: 5,
  },
  roundButtonstyle: {
    padding: 16,
    backgroundColor: 'yellow',
    borderRadius: 20,
  },
  roundButtonTextstyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  orButtonTextstyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
    padding: 16,
  },
  smallGrayText: {color: 'gray', fontWeight: 'bold'},
  smallBlackText: {fontWeight: 'bold', color: 'black'},
});
