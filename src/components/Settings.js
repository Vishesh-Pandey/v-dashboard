import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
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
            <i className="bi bi-person-circle"></i> You are Logged in
            <i className="bi bi-wifi"></i>
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
          <div className="col-12 py-2">
            <button
              data-bs-toggle="modal"
              data-bs-target="#profileModal"
              className="btn btn-primary w-100"
            >
              Profile
            </button>
          </div>
          <div className="col-12">
            <div
              className="modal fade"
              id="profileModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      v-dashboard Profile
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <p>Email: {getAuth().currentUser.email}</p>
                    <p>Name: {currentName} </p>
                    <input
                      value={newName}
                      onChange={handleNameChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter your name here to update"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary w-25"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
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
                      className="btn btn-primary w-25"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
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
      );
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
    <div className="row py-5">
      <div className="col-12">{checkStatus()}</div>
    </div>
  );
}

export default Settings;
