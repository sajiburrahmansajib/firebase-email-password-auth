// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjmxEZ6749HDj-Wl7ekDWr5luHcLthJfc",
    authDomain: "email-password-auth-e6c7f.firebaseapp.com",
    projectId: "email-password-auth-e6c7f",
    storageBucket: "email-password-auth-e6c7f.appspot.com",
    messagingSenderId: "1086475974393",
    appId: "1:1086475974393:web:bba4bc005bc3e02de01428"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;