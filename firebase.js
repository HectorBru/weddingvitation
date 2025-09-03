// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhbP0KJZtjM-VenHErCF0RFRfXMGuofNM",
  authDomain: "weddingvitation-b40df.firebaseapp.com",
  projectId: "weddingvitation-b40df",
  storageBucket: "weddingvitation-b40df.firebasestorage.app",
  messagingSenderId: "534969973691",
  appId: "1:534969973691:web:e4479f080029491c53e29e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);