import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr7J31UUmaFBRlYlZk1HNE5uHUC6-Vjt0",
  authDomain: "tcl-60-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-60-smart-shopping-list",
  storageBucket: "tcl-60-smart-shopping-list.appspot.com",
  messagingSenderId: "84161723862",
  appId: "1:84161723862:web:75f457a43cc66bb8bbb877"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
