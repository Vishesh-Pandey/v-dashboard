import "../App.css";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

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
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4 m-auto">
                <div>
                  <h4 className="py-3">v-dashboard - a place to focus</h4>
                </div>
                <input
                  className="form-control my-2"
                  ref={emailRef}
                  type="email"
                  name="given_email"
                  placeholder="Email"
                />
                <input
                  className="form-control my-2"
                  ref={passwordRef}
                  type="password"
                  name="give_pass"
                  placeholder="Password [Minimum 6 characters]"
                />
                <div className="submit">
                  <button
                    className="btn btn-secondary my-2 w-100"
                    onClick={handleSignup}
                  >
                    Signup
                  </button>
                  <button
                    className="btn btn-secondary my-2 w-100"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <Link
                  className="btn btn-sm btn-outline-secondary my-3 w-100"
                  to="/dashboard"
                >
                  Try without signup
                </Link>
                <p className="opacity-25">
                  <strong><h5><i className="bi bi-exclamation-circle-fill"></i> Without
                    Signup - You may lose your data</h5></strong>
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Signup;
