import React, { useEffect } from "react";

import Websites from "../features/websites/Websites";
import Notes from "../features/note/Notes";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Todo from "../features/todo/Todo";
import Navbar from "./Navbar";

function Dashboard() {
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Authentication changed");
      }
    });
  }, []);

  return (
    <>
      <Navbar />
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
    </>
  );
}

export default Dashboard;
