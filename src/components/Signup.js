import "../App.css";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  // Function to handle signup
  const handleSignup = () => {
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
        // account created succssfully
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(
          "Account Not created\nCheck your email id again\nMinimum required length for password: 6"
        );
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // Function to handle Login
  const handleLogin = () => {
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signup successful for user");
        console.log(user.email);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Unable to login!");
        console.log(errorMessage);
        alert("Invalid credentials");
      });
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div>v-dashboard - a place to focus</div>
          <input
            ref={emailRef}
            type="email"
            name="given_email"
            placeholder="Email"
          />
          <input
            ref={passwordRef}
            type="password"
            name="give_pass"
            placeholder="Password"
          />
          <div className="submit">
            <button onClick={handleSignup}>Signup</button>
            <button onClick={handleLogin}>Login</button>
          </div>
        </header>
      </div>
    </>
  );
}

export default Signup;
