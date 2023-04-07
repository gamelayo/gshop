import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: "gshop-dddf4.firebaseapp.com",
  projectId: "gshop-dddf4",
  storageBucket: "gshop-dddf4.appspot.com",
  messagingSenderId: "288780801656",
  appId: "1:288780801656:web:eabd68ee17d37cf0f3bf8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
