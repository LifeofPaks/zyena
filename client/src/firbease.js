// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zyena-b3fb1.firebaseapp.com",
  projectId: "zyena-b3fb1",
  storageBucket: "zyena-b3fb1.firebasestorage.app",
  messagingSenderId: "995672594913",
  appId: "1:995672594913:web:c93174a28c1cb12415daa0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);