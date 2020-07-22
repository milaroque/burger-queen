import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDPrl1Wy18D6rej3zpQEnlOBwUASe_IszI",
  authDomain: "burger-queen-lab-d4315.firebaseapp.com",
  databaseURL: "https://burger-queen-lab-d4315.firebaseio.com",
  projectId: "burger-queen-lab-d4315",
  storageBucket: "burger-queen-lab-d4315.appspot.com",
  messagingSenderId: "966507845552",
  appId: "1:966507845552:web:5ceaacd782f0a4a5b96875",
  measurementId: "G-MPDMRW3N0P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


  export default firebase
