import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyCAbs5DSOZd_11jCxv13H4n6jxE4umrPSY",
  authDomain: "chef-recipes-b2125.firebaseapp.com",
  databaseURL: "https://chef-recipes-b2125.firebaseio.com",
  projectId: "chef-recipes-b2125",
  storageBucket: "chef-recipes-b2125.appspot.com",
  messagingSenderId: "277244445074",
  appId: "1:277244445074:web:3ba58fb4d54cfbf229414b",
  measurementId: "G-KX2BJVBDS3"
};

const firebaseApp = firebase.initializeApp(config);
// export firestore database
export default firebaseApp.firestore()
