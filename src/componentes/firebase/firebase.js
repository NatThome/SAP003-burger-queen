import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCKY_nZDBldN9M0YitGUEtxmmEmnI2KEcw",
    authDomain: "burger-queen-8c4ba.firebaseapp.com",
    databaseURL: "https://burger-queen-8c4ba.firebaseio.com",
    projectId: "burger-queen-8c4ba",
    storageBucket: "burger-queen-8c4ba.appspot.com",
    messagingSenderId: "288460885507",
    appId: "1:288460885507:web:588dfc0edb89d12a0a0836",
    measurementId: "G-LS2VXNXXL4"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;