import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

function Settings() {
  const navigate = useNavigate();
  const [isOnline, setisOnline] = useState(false);

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
    window.location.reload();
  };

  const activateOfflineMode = () => {
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

  const checkStatus = () => {
    if (isOnline) {
      return (
        <div className="row">
          <div className="col-12 py-3 fw-bold">
            <i className="bi bi-emoji-smile mx-2"></i> You are online
          </div>
          <div className="col">
            <button
              onClick={activateOfflineMode}
              className="btn btn-outline-secondary w-100"
            >
              Switch offline
            </button>
          </div>
          <div className="col">
            <button
              onClick={handleSignout}
              className="btn btn-outline-secondary w-100"
            >
              Sign out
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-12 py-3 fw-bold">
            <i className="bi bi-emoji-frown mx-2"></i>You are Offline
          </div>

          <div className="col-12">
            <Link className="btn btn-secondary w-100" to="/">
              Signup / Login
            </Link>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setisOnline(true);
      } else {
        setisOnline(false);
      }
    });
  }, []);

  return (
    <div className="row py-5">
      <div className="col">{checkStatus()}</div>
    </div>
  );
}

export default Settings;
