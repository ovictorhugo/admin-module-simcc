// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB6AIST_y7t-XEPHz0qa6e454N3Kd8CMYQ",
  authDomain: "simccba.firebaseapp.com",
  projectId: "simccba",
  storageBucket: "simccba.appspot.com",
  messagingSenderId: "735553101030",
  appId: "1:735553101030:web:a3047174edf45a52f0ef27",
  measurementId: "G-HDJHKXTCFC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const storage = getStorage(app)