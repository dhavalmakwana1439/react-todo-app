// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtNVeCZ_Smn25KUlCu0d-zbtNxWll0diA",
  authDomain: "react-todo-app-dbb90.firebaseapp.com",
  projectId: "react-todo-app-dbb90",
  storageBucket: "react-todo-app-dbb90.appspot.com",
  messagingSenderId: "872821009454",
  appId: "1:872821009454:web:b198a58449945ea68483bf",
  measurementId: "G-LC25DYZ49L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);