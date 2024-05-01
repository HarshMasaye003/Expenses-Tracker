// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh6ZWN-MQx4wXeMKEH8QtoZzc0rJmwKZY",
  authDomain: "even-dream-330310.firebaseapp.com",
  projectId: "even-dream-330310",
  storageBucket: "even-dream-330310.appspot.com",
  messagingSenderId: "642993678010",
  appId: "1:642993678010:web:b03de6fa607455d60f0483",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
