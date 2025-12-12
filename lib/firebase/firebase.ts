import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.FIRESTORE_API_KEY,
//   authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
//   projectId: process.env.FIRESTORE_PROJECT_ID,
//   storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIRESTORE_MESSAGING_SENDER_ID,
//   appId: process.env.FIRESTORE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCKj7gGoELCbCn1khhXWm-rIVYx4kyvskY",
  authDomain: "news-service-544dd.firebaseapp.com",
  projectId: "news-service-544dd",
  storageBucket: "news-service-544dd.firebasestorage.app",
  messagingSenderId: "356060740312",
  appId: "1:356060740312:web:54a20bb2ab1c10f53ef5ad"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
