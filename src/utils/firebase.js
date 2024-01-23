
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHC6XyEHbEJPh76pd1an2F6TVg40n4XrE",
  authDomain: "mern-movies-ef1b4.firebaseapp.com",
  projectId: "mern-movies-ef1b4",
  storageBucket: "mern-movies-ef1b4.appspot.com",
  messagingSenderId: "951327693650",
  appId: "1:951327693650:web:fbf772e0177ef40ac2388b",
  measurementId: "G-10NXYLEHM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth=getAuth(app);