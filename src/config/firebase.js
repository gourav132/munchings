import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration object goes here
  apiKey: "AIzaSyDi-Ab6s_z4_zvOn7lhUytVZ3PRxFt1zuA",
  authDomain: "munchings-1a7f6.firebaseapp.com",
  projectId: "munchings-1a7f6",
  storageBucket: "munchings-1a7f6.appspot.com",
  messagingSenderId: "1012280582278",
  appId: "1:1012280582278:web:07b106091bcd94e09f7107"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
