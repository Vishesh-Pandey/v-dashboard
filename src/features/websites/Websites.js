import React, { useEffect, useRef } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  addWebsite,
  getWebsites,
  removeWebsite,
  selectWebsite,
} from "./websiteSlice";

import { useDispatch, useSelector } from "react-redux";

function Websites() {
  const dispatch = useDispatch();
  const websiteTitleRef = useRef();
  const websiteUrlRef = useRef();

  const websites = useSelector(selectWebsite);

  const getUserWebsites = async () => {
    dispatch(getWebsites());
  };

  const addWebsiteShortcut = async () => {
    if (websiteUrlRef.current.value.slice(0, 8) !== "https://") {
      alert("Link should start with https://");
      return;
    }

    dispatch(
      addWebsite({
        name: websiteTitleRef.current.value,
        link: websiteUrlRef.current.value,
      })
    );
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserWebsites();
      } else {
        alert("Something went wrong");
      }
    });
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Website
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <input
                ref={websiteTitleRef}
                className="form-control"
                type="text"
                placeholder="Website title"
              />
              <br />
              <input
                ref={websiteUrlRef}
                className="form-control"
                type="text"
                placeholder="Website URL"
                defaultValue={"https://"}
              />
              <div className="delete">
                {websites.map((element, index) => {
                  return (
                    <div key={index} className="col py-2">
                      <label className="text-center w-50">{element.name}</label>
                      <button
                        onClick={() => {
                          dispatch(removeWebsite(element.name));
                        }}
                        className="btn btn-outline-danger w-50"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={addWebsiteShortcut}
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-primary"
              >
                Add Website
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row py-3">
        {websites.map((element, index) => {
          return (
            <div key={index} className="col-2">
              <a rel="noreferrer" target="_blank" href={element.link}>
                <img
                  className="w-100 rounded-3"
                  style={{ cursor: "pointer" }}
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${element.link}`}
                  alt=""
                />
              </a>
              <p className="text-center">{element.name}</p>
            </div>
          );
        })}
        <div className="col-2">
          <img
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="w-100"
            style={{ cursor: "pointer" }}
            src="https://static.thenounproject.com/png/768833-200.png"
            alt=""
          />
          <p className="text-center">Add Website</p>
        </div>
      </div>
    </>
  );
}

export default Websites;
