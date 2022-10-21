import React from "react";
import { auth } from "./Home";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function SignIn() {
  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="SignIn">
      <header className="Login-header">
        <h1>Log in to take citizenship practice tests:</h1>
        <button onClick={googleSignIn} className="sign-in-button">
          Log in with Google
        </button>
      </header>
    </div>
  );
}
