import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCGTyeCqzbj4mF8dazqrrM2jntbEoIjve8",
  authDomain: "pricing-7f86d.firebaseapp.com",
  databaseURL: "https://pricing-7f86d-default-rtdb.firebaseio.com",
  projectId: "pricing-7f86d",
  storageBucket: "pricing-7f86d.firebasestorage.app",
  messagingSenderId: "267969665248",
  appId: "1:267969665248:web:b4a29b5111d61d12419885",
  measurementId: "G-9S8DW2D259"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

