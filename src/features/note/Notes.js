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
import { copy } from "./noteSlice";

function Notes() {
  const note = useSelector(selectNote);
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const [noteSaving, setNoteSaving] = useState(false);
  const [writing, setWriting] = useState(null);
  const text = useRef();

  const updateNote = (event) => {
    if (writing) {
      clearTimeout(writing);
    }
    setNoteSaving(true);
    dispatch(change(event.target.value));
    setWriting(
      setTimeout(() => {
        dispatch(saveNotesOnDatabase(text.current.value));
        setNoteSaving(false);
      }, 700)
    );
  };

  useEffect(() => {
    dispatchRef.current(fetchNotes());
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatchRef.current(fetchNotes());
      }
    });
  }, [dispatchRef]);

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="form-floating">
            <textarea
              ref={text}
              onBlur={() => {
                dispatch(saveNotesOnDatabase(text.current.value));
                setNoteSaving(false);
              }}
              className="form-control"
              placeholder="Write your note here..."
              id="floatingTextarea2"
              style={{ height: "50vh", resize: "none" }}
              value={note}
              onChange={updateNote}
            />
            <label htmlFor="floatingTextarea2">
              <strong>Your Notes</strong>
            </label>
            <div
              className={`text-success position-absolute bottom-0 start-0 p-3 `}
            >
              {noteSaving === true ? (
                <div>
                  <i className="bi bi-cloud-arrow-up fs-4 mx-1"></i>
                </div>
              ) : (
                <span>
                  <i className="bi bi-cloud-check fs-4 mx-1"></i>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 py-2">
          <div className="row">
            <div className="col">
              <button
                onClick={() => {
                  dispatch(copy());
                }}
                className="btn btn-outline-primary w-100"
              >
                Copy
              </button>
            </div>
            <div className="col">
              <button
                onClick={() => {
                  dispatch(clear());
                }}
                className="btn btn-outline-danger w-100"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
