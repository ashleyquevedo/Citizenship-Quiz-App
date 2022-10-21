import React from "react";
import SignOut from "./SignOut";

export default function Welcome() {
  return (
    <div className="Welcome">
      <h1>You are logged in.</h1>
      <SignOut />
    </div>
  );
}
