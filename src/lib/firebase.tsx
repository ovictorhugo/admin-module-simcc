// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5Jb5U_4xPVuNg5ZQfieV3lgissi0K67Q",
  authDomain: "omarcoss-87125.firebaseapp.com",
  projectId: "omarcoss-87125",
  storageBucket: "omarcoss-87125.appspot.com",
  messagingSenderId: "286088311565",
  appId: "1:286088311565:web:d9b875b48a8cca08cd3644",
  measurementId: "G-NJLQ3MP09X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const storage = getStorage(app)