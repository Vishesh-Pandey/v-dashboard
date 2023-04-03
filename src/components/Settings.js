import React from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";

function Settings() {
  const navigate = useNavigate();

  const handleSignout = () => {
    console.log("Trying to log out");
    const auth = getAuth();
    console.log(auth.currentUser.email);
    navigate("/");

    try {
      const auth = getAuth();
      console.log(auth.email);

      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("Success");
        })
        .catch((error) => {
          // An error happened.
          console.log("error", error);
        });
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  return (
    <div className="row p-2">
      <div className="col">
        <button className="btn btn-primary float-end">
          <i className="bi bi-three-dots"></i>
        </button>
      </div>
      <div className="col">
        <button onClick={handleSignout} className="btn btn-warning w-100">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Settings;
