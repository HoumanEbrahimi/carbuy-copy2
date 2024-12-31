import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Import the functions you need from the SDKs you need
import{getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5jMAb24JXAl0Z9-3gEEBSWv4ztFbNBWw",
  authDomain: "carbuy-solutions.firebaseapp.com",
  projectId: "carbuy-solutions",
  storageBucket: "carbuy-solutions.firebasestorage.app",
  messagingSenderId: "823570647196",
  appId: "1:823570647196:web:58877a9c340468763c4559",
  measurementId: "G-2G47WDRCQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export default app;