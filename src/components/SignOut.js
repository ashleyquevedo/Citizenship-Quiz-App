import React from "react";
import { auth } from "./Home";

export default function SignOut() {
  return (
    auth.currentUser && (
      <div>
        <button onClick={() => auth.signOut()}>Log Out</button>
      </div>
    )
  );
}
