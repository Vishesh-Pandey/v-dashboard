import React, { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
      <div>Dashboard</div>
      <h1>
        Current-user :
        {loading === true ? "Loading..." : getAuth().currentUser.email}
      </h1>
      <button onClick={handleSignOut}>SignOut</button>
    </>
  );
}

export default Dashboard;
