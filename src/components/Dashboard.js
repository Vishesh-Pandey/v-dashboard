import React from "react";

function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
      <p>user : {localStorage.getItem("currentUser")}</p>
    </>
  );
}

export default Dashboard;
