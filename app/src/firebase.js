import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyALq4JFnbpjCzg4U8ydRSRgvV0QOLkZZo4",
    authDomain: "bulletin-7ffe4.firebaseapp.com",
    projectId: "bulletin-7ffe4",
    storageBucket: "bulletin-7ffe4.appspot.com",
    messagingSenderId: "1090891007634",
    appId: "1:1090891007634:web:3af4a34b9db4696542884b",
    measurementId: "G-VFGWKCS264"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);