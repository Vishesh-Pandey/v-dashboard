import "../App.css";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  // Function to handle signup
  const handleSubmit = () => {
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
        alert("Account Not created\nCheck your email id again");
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div>Signup | v-dashboard</div>
          <input
            ref={emailRef}
            type="email"
            name="given_email"
            id=""
            placeholder="Email"
          />
          <input
            ref={passwordRef}
            type="password"
            name="give_pass"
            id=""
            placeholder="Password"
          />

          <button onClick={handleSubmit}>Submit</button>
          <Link to="/login">Click here to login</Link>
        </header>
      </div>
    </>
  );
}

export default Signup;
