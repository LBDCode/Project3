import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBeUiaotv-6BT_gmhU2ArjXA2zcLYvw2Qc",
  authDomain: "recipedia-app.firebaseapp.com",
  databaseURL: "https://recipedia-app.firebaseio.com",
  projectId: "recipedia-app",
  storageBucket: "recipedia-app.appspot.com",
  messagingSenderId: "630975380332"
};

const Firebase = firebase.initializeApp(config);

export default Firebase;
