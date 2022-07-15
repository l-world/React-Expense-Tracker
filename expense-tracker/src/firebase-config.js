// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDn6fnNCNBNts6Ianx4IrkBM-wEYmsO9F4",
    authDomain: "react-expense-tracker-d9dd7.firebaseapp.com",
    projectId: "react-expense-tracker-d9dd7",
    storageBucket: "react-expense-tracker-d9dd7.appspot.com",
    messagingSenderId: "379573324533",
    appId: "1:379573324533:web:111d72bd157e40a99413bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider(app);

