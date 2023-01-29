import React, { useRef } from "react";
import { auth } from "../firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

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
        localStorage.setItem("currentUser", user.email);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("There was some issue to login");
        console.log(errorMessage);
      });

    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
  };

  return (
    <>
      <div>Login</div>
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
    </>
  );
}

export default Login;
