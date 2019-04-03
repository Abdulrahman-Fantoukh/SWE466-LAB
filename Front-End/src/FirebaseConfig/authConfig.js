import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCEjkbGMsBYQBX-Bx31vG7qE_4pboFvdMs",
  authDomain: "swe466-lab.firebaseapp.com",
  databaseURL: "https://swe466-lab.firebaseio.com",
  projectId: "swe466-lab",
  storageBucket: "swe466-lab.appspot.com",
  messagingSenderId: "528999801861"
};
 const fb = firebase.initializeApp(config);
 export default fb;