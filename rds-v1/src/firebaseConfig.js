// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuKQqRCLq0nBCmF_2dQ7s5In4fXTejhbU",
  authDomain: "redservice-e3880.firebaseapp.com",
  projectId: "redservice-e3880",
  storageBucket: "redservice-e3880.appspot.com",
  messagingSenderId: "1011050436773",
  appId: "1:1011050436773:web:491ac5ab9cb3a926eb554c",
};

// Initialize Firebase
//Variable app is used to passing the firebaseConfig data
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
//Here I export all these variables to be used on differents part of my project
export { auth, app, firestore, storage };
