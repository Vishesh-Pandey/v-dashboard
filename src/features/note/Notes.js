import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { onAuthStateChanged, getAuth } from "firebase/auth";

import {
  change,
  clear,
  selectNote,
  fetchNotes,
  saveNotesOnDatabase,
} from "./noteSlice";

function Notes() {
  const note = useSelector(selectNote);
  const dispatch = useDispatch();
  const [noteSaving, setNoteSaving] = useState(false);
  const text = useRef();

  const updateNote = (event) => {
    dispatch(change(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchNotes());
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(fetchNotes());
      } else {
        console.log("Not able to fetch notes");
      }
    });
  }, []);

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
                dispatch(saveNotesOnDatabase(text.current.value));
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
