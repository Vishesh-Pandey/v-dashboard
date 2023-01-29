import React, { useRef } from "react";
import { auth } from "../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
  };

  return (
    <>
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
    </>
  );
}

export default Signup;
