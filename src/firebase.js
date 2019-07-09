import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
// import fcm from 'firebase/firebase-messaging'
// const settings = {timestampsInSnapshots: true};
// navigationOptions = ({ navigation }) => ({})
if (!firebase.apps.length) {
  
  var firebaseConfig = {
    apiKey: "AIzaSyBBeo91E319oZbet6SkgA9Sq5UlIHI5x7U",
    authDomain: "blogs-9a8a6.firebaseapp.com",
    databaseURL: "https://blogs-9a8a6.firebaseio.com",
    projectId: "blogs-9a8a6",
    storageBucket: "",
    messagingSenderId: "500327967771",
    appId: "1:500327967771:web:08f72bf21df0279f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
}

  // firebase.firestore().settings(settings);

export default firebase;