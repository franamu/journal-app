// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB2ovwg5vHNEoeNUAS52cLNmvVG2xltmFA",
  authDomain: "react-app-curso-2f224.firebaseapp.com",
  projectId: "react-app-curso-2f224",
  storageBucket: "react-app-curso-2f224.appspot.com",
  messagingSenderId: "109455714374",
  appId: "1:109455714374:web:bae4c9f6b22659396dc247"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();


export {
  db,
  googleAuthProvider,
  firebase,
  auth
}