var firebaseConfig = {
apiKey: "AIzaSyBm_QVEm0nCe3jlewQK9FpVY5hZ4_1tYsM",
  authDomain: "dac-destination-alarm-clock.firebaseapp.com",
  projectId: "dac-destination-alarm-clock",
  storageBucket: "dac-destination-alarm-clock.appspot.com",
  messagingSenderId: "393994840902",
  appId: "1:393994840902:web:5c4c771c130583456e9347",
  measurementId: "G-R38KL26NTF"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();