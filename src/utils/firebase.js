// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlRKxj-PPjZuOsPWkeDFM38ZDwaJU-6wA",
  authDomain: "netflixgpt-752b0.firebaseapp.com",
  projectId: "netflixgpt-752b0",
  storageBucket: "netflixgpt-752b0.firebasestorage.app",
  messagingSenderId: "1010858419849",
  appId: "1:1010858419849:web:702784fb73e4a8a3668858",
  measurementId: "G-0YG2SSFM91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);