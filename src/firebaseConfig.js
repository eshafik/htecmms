import firebase from "firebase";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBx8sGQIsXKs4Ea6gAAC7BPkr8yFO6LZ_U",
    authDomain: "machine-status-dev.firebaseapp.com",
    projectId: "machine-status-dev",
    storageBucket: "machine-status-dev.appspot.com",
    messagingSenderId: "775493256846",
    appId: "1:775493256846:web:07c0ec9bba3eb29ef2abdf",
    measurementId: "G-L3EJ9VVW5S"
};
firebase.initializeApp(firebaseConfig);
export default firebase;