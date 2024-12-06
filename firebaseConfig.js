import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBm18frye6y8yxlJB7cYR5ENCrjFOLjk4w",
    authDomain: "analytics-app-cf92f.firebaseapp.com",
    projectId: "analytics-app-cf92f",
    storageBucket: "analytics-app-cf92f.firebasestorage.app",
    messagingSenderId: "881689785109",
    appId: "1:881689785109:web:f2d7a917edbb84a4882f1c",
    measurementId: "G-1Q4J55LW3F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
