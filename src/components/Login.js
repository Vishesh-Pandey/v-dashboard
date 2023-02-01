import "../App.css";
import React, { useRef } from "react";
import { auth } from "../firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = () => {
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
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Unable to login!");
        console.log(errorMessage);
      });
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div>Login</div>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button onClick={handleSubmit}>Submit</button>
          <Link to="/">Click here to signup</Link>
        </header>
      </div>
    </>
  );
}

export default Login;
