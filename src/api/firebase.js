import firebase from "firebase/app";
import 'firebase/functions';

const config = {
  apiKey: "AIzaSyAh7G5HPy_neYRAodmJjXW3u2KnTuveLzA",
  authDomain: "forttrack123.firebaseapp.com",
  databaseURL: "https://forttrack123.firebaseio.com",
  projectId: "forttrack123",
  storageBucket: "forttrack123.appspot.com",
  messagingSenderId: "654251743417"
};
firebase.initializeApp(config);
export default firebase;