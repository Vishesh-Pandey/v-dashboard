import React, { useEffect, useRef, useState } from "react";

import app from "../firebase";
import {
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Websites() {
  const websiteTitleRef = useRef();
  const websiteUrlRef = useRef();
  const db = getFirestore(app);
  const [websites, setWebsites] = useState([]);

  const getUserWebsites = async () => {
    const querySnapshot = await getDocs(
      collection(db, getAuth().currentUser.email + "/dashboard/websites")
    );

    let websiteUpdateArray = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      websiteUpdateArray.push(doc.data());
    });
    setWebsites(websiteUpdateArray);
  };

  const addWebsite = async () => {
    console.log("Current websites");
    console.log(websites);
    try {
      await setDoc(
        doc(
          db,
          getAuth().currentUser.email + "/dashboard/websites",
          websiteTitleRef.current.value
        ),
        {
          Name: websiteTitleRef.current.value,
          Link: websiteUrlRef.current.value,
        }
      );
      getUserWebsites();
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Incountered some issue while adding website");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserWebsites();
      } else {
        console.log("User not authenticated!");
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
              />
              <div className="delete">
                {websites.map((element, index) => {
                  return (
                    <div key={index} className="col py-2">
                      <label className="text-center w-50">{element.Name}</label>
                      <button
                        onClick={() => {
                          deleteDoc(
                            doc(
                              db,
                              getAuth().currentUser.email +
                                "/dashboard/websites",
                              element.Name
                            )
                          );
                          getUserWebsites();
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
                onClick={addWebsite}
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
              <a rel="noreferrer" target="_blank" href={element.Link}>
                <img
                  className="w-100 rounded-3"
                  style={{ cursor: "pointer" }}
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${element.Link}`}
                  alt=""
                />
              </a>
              <p className="text-center">{element.Name}</p>
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
