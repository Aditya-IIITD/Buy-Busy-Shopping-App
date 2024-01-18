// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPmREblSNpWPq6JllcxZMT4igsoRwNKQw",
  authDomain: "buy-busy-app-a436f.firebaseapp.com",
  projectId: "buy-busy-app-a436f",
  storageBucket: "buy-busy-app-a436f.appspot.com",
  messagingSenderId: "60282163329",
  appId: "1:60282163329:web:7e720e2af0960e31a17d80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export default db;
