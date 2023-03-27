import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { change, clear, selectNote, fetchNotes } from "./noteSlice";

import app from "../../firebase";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Notes() {
  const note = useSelector(selectNote);
  const dispatch = useDispatch();
  const db = getFirestore(app);
  const [noteSaving, setNoteSaving] = useState(false);
  const text = useRef();
  // const [note, setNote] = useState("");

  // this saves notes on database on blur of textarea
  const saveNotesOnDatabase = async () => {
    try {
      await setDoc(
        doc(db, getAuth().currentUser.email + "/dashboard/notes", "note"),
        {
          text: text.current.value,
        }
      );
    } catch (e) {
      alert("Unable to save notes");
    }
  };

  const updateNote = (event) => {
    console.log(note);
    dispatch(change(event.target.value));
  };

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       fetchNotes();
  //     } else {
  //       console.log("Not able to fetch notes");
  //     }
  //   });
  // }, []);

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="form-floating">
            <textarea
              ref={text}
              onFocus={() => {
                setNoteSaving(true);
              }}
              onBlur={() => {
                setNoteSaving(false);
                saveNotesOnDatabase();
              }}
              className="form-control"
              placeholder="Write your note here..."
              id="floatingTextarea2"
              style={{ height: "80vh", resize: "none" }}
              value={note}
              onChange={updateNote}
            />
            <label htmlFor="floatingTextarea2">Notes</label>
            <div
              className={`text-success position-absolute bottom-0 start-0 p-3 ${
                noteSaving === false ? "d-none" : ""
              }`}
            >
              <span
                className="spinner-grow spinner-grow-sm me-3"
                role="status"
                aria-hidden="true"
              ></span>
              Saving on v-dashboard...
            </div>
          </div>
        </div>
        <div className="col-12">
          <button
            onClick={() => {
              dispatch(clear());
            }}
            className="btn btn-secondary"
          >
            Clear
          </button>
          <button
            onClick={() => {
              dispatch(fetchNotes());
            }}
            className="btn btn-success"
          >
            Fetch from database
          </button>
        </div>
      </div>
    </>
  );
}

export default Notes;
