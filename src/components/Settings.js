import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

function Settings() {
  const navigate = useNavigate();
  const [isOnline, setisOnline] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [newName, setNewName] = useState("");
  const [nameUpdating, setNameUpdating] = useState(false);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSignout = () => {
    const auth = getAuth();
    console.log(auth.currentUser.email);

    try {
      const auth = getAuth();

      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate("/");
          window.location.reload(); // to clear offline states
        })
        .catch((error) => {
          // An error happened.
          alert("Something went wrong");
        });
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setisOnline(true);
        setCurrentName(getAuth().currentUser.displayName);
      } else {
        setisOnline(false);
      }
    });
  }, []);

  return (
    <div className="row">
      {isOnline ? (
        <div className="row">
          <div className="col-12 py-3 fw-bold">
            <i className="bi bi-person-circle"></i> You are Logged in
            <i className="bi bi-wifi"></i>
          </div>

          <div className="col">
            <button
              onClick={handleSignout}
              className="btn btn-outline-danger w-100"
            >
              Log out
            </button>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <h6 className="py-2">Email: {getAuth().currentUser.email}</h6>
                <h6>Name: {currentName} </h6>
                <input
                  value={newName}
                  onChange={handleNameChange}
                  type="text"
                  className="form-control"
                  placeholder="Enter your name here to update"
                />
              </div>
              <div className="col-6 py-1">
                <button
                  onClick={() => {
                    setNameUpdating(true);
                    updateProfile(getAuth().currentUser, {
                      displayName: newName,
                    })
                      .then(() => {
                        setCurrentName(getAuth().currentUser.displayName);
                        setNewName("");
                        setNameUpdating(false);
                      })
                      .catch((error) => {
                        alert("Something went wrong!");
                      });
                  }}
                  type="button"
                  className="btn btn-primary w-100"
                  disabled={newName === ""}
                >
                  {nameUpdating ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
              <div className="col-6 py-1">
                {!getAuth().currentUser.emailVerified ? (
                  <button
                    onClick={async () => {
                      sendEmailVerification(getAuth().currentUser).then(() => {
                        alert("We sent you a mail for varification!");
                      });
                    }}
                    className="btn btn-outline-primary w-100"
                  >
                    Varify Email
                  </button>
                ) : (
                  <button className="btn btn-success w-100" disabled>
                    Email Varified
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 py-3 fw-bold">
            <i className="bi bi-person-circle"></i>You are Offline
            <i className="bi bi-wifi-off"></i>
          </div>

          <div className="col-12">
            <Link className="btn btn-secondary w-100" to="/">
              Signup / Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
