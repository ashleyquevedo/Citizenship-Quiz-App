import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Home";

export default function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <nav className="nav-container">
      <div className="nav-left">
        <Link to="/" style={{ color: "inherit" }}>
          Home
        </Link>
        {user && (
          <>
            <Link to="/test" style={{ color: "inherit" }}>
              Take a Test!
            </Link>
            <Link to="/scores" style={{ color: "inherit" }}>
              Your Scores
            </Link>
          </>
        )}
      </div>
      <div className="nav-right">
        {user && (
          <Link
            to="/"
            style={{ color: "inherit" }}
            onClick={() => auth.signOut()}
          >
            Log Out
          </Link>
        )}
      </div>
    </nav>
  );
}
