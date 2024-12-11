
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBztWPRnG6JuyOgTqDgnitIDhyw6ztNLvc",
  authDomain: "myfirstfirebase-d789c.firebaseapp.com",
  projectId: "myfirstfirebase-d789c",
  storageBucket: "myfirstfirebase-d789c.firebasestorage.app",
  messagingSenderId: "7686610733",
  appId: "1:7686610733:web:eb7c9893e01bcda827bda4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
