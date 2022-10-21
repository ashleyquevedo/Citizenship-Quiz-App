import "../App.css";
import React from "react";
import SignIn from "./SignIn";
import Welcome from "./Welcome";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: "AIzaSyDjG-5Haz4EMzN8XNjf4KVAy2Gdbau_8SM",
  authDomain: "citizenshipquiz-1ce1e.firebaseapp.com",
  projectId: "citizenshipquiz-1ce1e",
  storageBucket: "citizenshipquiz-1ce1e.appspot.com",
  messagingSenderId: "860328369494",
  appId: "1:860328369494:web:b4c65b512f72bbff7c8af7",
  measurementId: "G-MMVF2FLQMJ",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

function Home() {
  const [user] = useAuthState(auth);

  return <div className="App">{user ? <Welcome /> : <SignIn />}</div>;
}

export default Home;
