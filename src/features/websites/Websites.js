import React, { useEffect, useRef, useState } from "react";

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
  const dispatchRef = useRef(dispatch);

  const [websiteData, setWebsiteData] = useState({
    name: "",
    link: "https://",
  });

  const handleChange = (event) => {
    event.preventDefault();
    setWebsiteData({ ...websiteData, [event.target.name]: event.target.value });
  };

  const websites = useSelector(selectWebsite);

  const addWebsiteShortcut = async (event) => {
    event.preventDefault();
    dispatch(addWebsite(websiteData));
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatchRef.current(getWebsites());
      }
    });
  }, [dispatchRef]);

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
          <form onSubmit={addWebsiteShortcut} className="modal-content">
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
                name="name"
                value={websiteData.name}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Website title ( Max Length: 8 )"
                minLength={3}
                required
              />
              <br />
              <input
                name="link"
                value={websiteData.link}
                onChange={handleChange}
                className="form-control"
                type="url"
                placeholder="Website URL"
                required
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
              <button type="submit" className="btn btn-primary">
                Add Website
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row py-3">
        {websites.map((element, index) => {
          return (
            <div key={index} className="col-lg-2 col-sm-3 col-4">
              <a rel="noreferrer" target="_blank" href={element.link}>
                <img
                  className="w-100 rounded-3 border border-1 border-secondary"
                  style={{ cursor: "pointer" }}
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${element.link}`}
                  alt=""
                />
              </a>
              <p className="text-center">{element.name}</p>
            </div>
          );
        })}
        <div className="col-md-2 col-4 py-3">
          <img
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="w-100 rounded-3  border-1 border-secondary"
            style={{ cursor: "pointer" }}
            src="https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_640.png"
            alt=""
          />
          <p className="text-center">Add Website</p>
        </div>
      </div>
    </>
  );
}

export default Websites;
