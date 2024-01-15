import "../App.css";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { doc, setDoc, getFirestore } from "firebase/firestore";
import { auth } from "../firebase";
import app from "../firebase";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { useDispatch } from "react-redux";

import { addWebsite } from "../features/websites/websiteSlice";

import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const continueWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        alert("Something went wrong :" + error);
        console.log();
      });
  };

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
        //load initial information
        setDoc(doc(getFirestore(app), "users/" + user.uid), {
          email: user.email,
          signupDate: new Date(),
        }).then((data) => {
          // account created succssfully
          dispatch(
            addWebsite({ name: "Youtube", link: "https://www.youtube.com/" })
          );
          navigate("/dashboard");
        });
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("use logged in!");
        console.log(user);
        if (user !== null) {
          navigate("/dashboard");
        }
      } else {
        console.log("use not authenticated");
      }
    });
  }, [navigate]);

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
                    className="btn btn-primary my-2 w-100"
                    onClick={handleSignup}
                  >
                    Signup
                  </button>
                  <button
                    className="btn btn-success my-2 w-100"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <Link
                  className="btn btn-sm btn-outline-warning my-3 w-100"
                  to="/dashboard"
                >
                  Try without signup
                </Link>
                <div className="opacity-25">
                  <strong>
                    <h5>
                      <i className="bi bi-exclamation-circle-fill"></i> Without
                      Signup - You may lose your data
                    </h5>
                  </strong>
                </div>
                <div className="submit">
                  <button
                    className="btn btn-light my-2 w-100"
                    onClick={continueWithGoogle}
                  >
                    Continue with Google <i className="bi bi-google"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Signup;
