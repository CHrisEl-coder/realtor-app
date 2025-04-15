// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBySCZcxaum7jEEvFHtVa_uZyquTTKkVEM",
  authDomain: "chris-creatives.firebaseapp.com",
  projectId: "chris-creatives",
  storageBucket: "chris-creatives.appspot.com",
  messagingSenderId: "159950951988",
  appId: "1:159950951988:web:0b099fa20473ecc9b0dc61"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore();

 