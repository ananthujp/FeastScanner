// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4BmlMr8zaSCm4iwc2Y__NLRw63aOvthY",
  authDomain: "onam-login.firebaseapp.com",
  projectId: "onam-login",
  storageBucket: "onam-login.appspot.com",
  messagingSenderId: "162338684391",
  appId: "1:162338684391:web:3799af2af560bec14e1142",
  measurementId: "G-J7RTVFM58Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const storage = getStorage(app);
const db = getFirestore(app);
export { db };
