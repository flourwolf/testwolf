
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBedSic94anZQTk0TC62Pfar_v-FlhI3xg",
  authDomain: "coyote-b7688.firebaseapp.com",
  projectId: "coyote-b7688",
  storageBucket: "coyote-b7688.firebasestorage.app",
  messagingSenderId: "465242376592",
  appId: "1:465242376592:web:0cf0ca64e94bbd81410b15",
  measurementId: "G-4WC9E8V4CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);