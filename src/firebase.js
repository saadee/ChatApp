import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC13jslUQFjEtw2y_qc_bXQb36ak9NY8X0",
  authDomain: "whatsapp-81adb.firebaseapp.com",
  projectId: "whatsapp-81adb",
  storageBucket: "whatsapp-81adb.appspot.com",
  messagingSenderId: "57900857839",
  appId: "1:57900857839:web:3791f6d9d4edb3a5e49e1a",
  measurementId: "G-HBE3P5Q90G",
};
 firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
  