import "../App.css";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import app, { auth } from "../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const db = getFirestore(app);

  const navigate = useNavigate();

  // Creating an initial sample collection while Signup
  const createNewCollection = async () => {
    try {
      const docRef = await addDoc(collection(db, emailRef.current.value), {
        Name: "vType",
        Link: "https://vishesh-pandey.github.io/v-type/",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Incountered some issue while initializing your account");
    }
  };

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
        createNewCollection(user.email);
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
          <div>Signup</div>
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
