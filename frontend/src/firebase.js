// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu6kQXpja-_UzFUc-XLN5RDrN8o77--GY",
  authDomain: "r2d2-chatwebapp.firebaseapp.com",
  projectId: "r2d2-chatwebapp",
  storageBucket: "r2d2-chatwebapp.appspot.com",
  messagingSenderId: "819456531333",
  appId: "1:819456531333:web:4bdb56e2d1d5a1b15ac2ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;