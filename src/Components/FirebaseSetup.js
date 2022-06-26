// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATWupSNN4bz7wizN1nP88G3xI8541hS3s",
    authDomain: "ontym-28a61.firebaseapp.com",
    projectId: "ontym-28a61",
    storageBucket: "ontym-28a61.appspot.com",
    messagingSenderId: "126778743959",
    appId: "1:126778743959:web:43d32a43201de7854eddd2"
};
const FirebaseSetup = initializeApp(firebaseConfig);
const db = getFirestore(FirebaseSetup);

export const storage = getStorage(FirebaseSetup);
export const firestore = db;

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app(); // if already initialized, use that one
// }
// const firestorage = firebase.storage();
// const firestore = firebase.firestore();
// export default app;  