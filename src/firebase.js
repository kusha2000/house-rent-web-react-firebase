// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKjS4DL-WVT4r8C7jE2W-2mw-jUTfaMbA",
  authDomain: "houselk.firebaseapp.com",
  projectId: "houselk",
  storageBucket: "houselk.appspot.com",
  messagingSenderId: "329107634003",
  appId: "1:329107634003:web:646ec1d3dfc961711593a6"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db=getFirestore()