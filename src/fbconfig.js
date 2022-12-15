/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // you'll need to obtain your own firebase config.
  apiKey: "AIzaSyC2EidJ20A2dO0IKBI9zqSOpsECr6keex4",
  authDomain: "profound-ripsaw-290912.firebaseapp.com",
  projectId: "profound-ripsaw-290912",
  storageBucket: "profound-ripsaw-290912.appspot.com",
  messagingSenderId: "1073624061285",
  appId: "1:1073624061285:web:8d010a36b2c9c9f8df7d8c"
};

let firebaseApp;
try {
  firebaseApp = getApp();
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig);
}

const db = getFirestore(firebaseApp, {});
export { db, firebaseApp };
