import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Websites from "./Websites";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Notes from "./Notes";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("authenticated user fetched successfully");
        setLoading(false);
      } else {
        console.log("Unable to fetch user data");
      }
    });
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
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
          <div className="col">
            <Websites />
          </div>
          <div className="col py-3">
            <Notes />
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
