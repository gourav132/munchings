import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDi-Ab6s_z4_zvOn7lhUytVZ3PRxFt1zuA",
  authDomain: "munchings-1a7f6.firebaseapp.com",
  projectId: "munchings-1a7f6",
  storageBucket: "munchings-1a7f6.appspot.com",
  messagingSenderId: "1012280582278",
  appId: "1:1012280582278:web:07b106091bcd94e09f7107"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const email = "admin@restaurant.com";
const password = "Admin@123";

async function createAdminUser() {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add admin custom claim in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'admin',
      createdAt: new Date().toISOString()
    });

    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
