import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Websites from "./Websites";
import Notes from "../features/note/Notes";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Todo from "../features/todo/Todo";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        alert("Unable to authenticate");
      }
    });
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        alert("Unable to signOut");
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Websites />
          </div>
          <div className="col-md-6 py-3">
            <div className="row">
              <div className="col-lg-6">
                <Todo />
              </div>
              <div className="col-lg-6">
                <Notes />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center position-absolute bottom-0 start-0">
        <button
          className="btn btn-outline-warning border-0"
          onClick={handleSignOut}
        >
          SignOut
          <span className="mx-3">
            {loading === true ? "Loading..." : getAuth().currentUser.email}
          </span>
        </button>
      </div>
    </>
  );
}

export default Dashboard;
