// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "mern-blog-f68b6.firebaseapp.com",
  projectId: "mern-blog-f68b6",
  storageBucket: "mern-blog-f68b6.appspot.com",
  messagingSenderId: "484602164052",
  appId: "1:484602164052:web:608b68680806eec0628ec1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
