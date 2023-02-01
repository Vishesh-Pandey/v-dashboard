import React, { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

function Dashboard() {
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

  return (
    <>
      <div>Dashboard</div>
      <h1>
        Current-user :
        {loading === true ? "Loading..." : getAuth().currentUser.email}
      </h1>
    </>
  );
}

export default Dashboard;
