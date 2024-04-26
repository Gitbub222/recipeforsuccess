// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, inMemoryPersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD87-1_TLlZnWH-7vRg3cIexDTwP5BvRjw",
  authDomain: "recipeapp-4ee79.firebaseapp.com",
  projectId: "recipeapp-4ee79",
  storageBucket: "recipeapp-4ee79.appspot.com",
  messagingSenderId: "660664504854",
  appId: "1:660664504854:web:0de475073f399b0ec45b37",
  measurementId: "G-QV9Y0GRE8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: inMemoryPersistence 
});

const db = getFirestore(app);

export { auth, db };