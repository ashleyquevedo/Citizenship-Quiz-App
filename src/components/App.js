import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Test from "./Test";
import Scores from "./Scores";

import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Home";

import Home from "./Home";

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Router>
        <main>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            {user && <Route exact path="/test" element={<Test />} />}
            {user && <Route exact path="/scores" element={<Scores />} />}
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
