import React from "react";
import Settings from "./Settings";

function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/dashboard">
          v-dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-person-circle"></i>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <Settings />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
