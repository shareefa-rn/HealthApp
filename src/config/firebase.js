// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAe_EjZteu89x5lAnsTVe90D14bAryiFUE',
  authDomain: 'healthapp-cc4ee.firebaseapp.com',
  projectId: 'healthapp-cc4ee',
  storageBucket: 'healthapp-cc4ee.appspot.com',
  messagingSenderId: '545465019890',
  appId: '1:545465019890:web:df0164027ae37d5bcb8f6b',
  measurementId: 'G-N6GHBN7H8H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
