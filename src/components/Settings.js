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
            <i class="bi bi-person-circle"></i> You are Logged in<i class="bi bi-wifi"></i>
          </div>
          <div className="col">
            <button
              onClick={activateOfflineMode}
              className="btn btn-outline-danger w-100"
            >
              Go offline
            </button>
          </div>
          <div className="col">
            <button
              onClick={handleSignout}
              className="btn btn-outline-danger w-100"
            >
              Log out
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-12 py-3 fw-bold">
            <i class="bi bi-person-circle"></i>You are Offline<i class="bi bi-wifi-off"></i>
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
