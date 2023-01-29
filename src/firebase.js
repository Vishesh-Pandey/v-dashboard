import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

// this information will be changed in future
const app = initializeApp({
  apiKey: "AIzaSyCWoCt95wMiUiMG2D9YEKzji_BEPuJUe9s",
  authDomain: "react-firebase-auth-98876.firebaseapp.com",
  projectId: "react-firebase-auth-98876",
  storageBucket: "react-firebase-auth-98876.appspot.com",
  messagingSenderId: "778073829286",
  appId: "1:778073829286:web:d1341911635789f19c6967",
});

export const auth = getAuth(app);
export default app;
