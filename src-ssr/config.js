const admin = require("firebase-admin")

require("dotenv/config")

var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
}
// Initialize Firebase
admin.initializeApp(firebaseConfig)
const firebaseAuth = admin.auth()
const firestore = admin.firestore()

module.exports = { admin, firebaseAuth, firestore }
