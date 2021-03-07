// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth"
import "firebase/firestore"

// PUT YOUR OWN FIREBASE CONFIGURATION HERE
var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebase.auth()
const firestore = firebase.firestore()

export { firebaseAuth, firestore }
