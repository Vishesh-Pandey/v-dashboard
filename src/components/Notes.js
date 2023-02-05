import React, { useState } from "react";
import Todo from "./Todo";

function Notes() {
  const [noteSaving, setNoteSaving] = useState(false);

  return (
    <>
      <div className="row">
        <div className="col">
          <Todo />
        </div>
        <div className="col">
          <div className="form-floating">
            <textarea
              onFocus={() => {
                setNoteSaving(true);
              }}
              onBlur={() => {
                setNoteSaving(false);
              }}
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: "80vh", resize: "none" }}
              defaultValue={""}
            />
            <label htmlFor="floatingTextarea2">Notes</label>
            <div
              className={`text-danger position-absolute bottom-0 start-0 p-3 ${
                noteSaving === false ? "d-none" : ""
              }`}
            >
              <span
                className="spinner-grow spinner-grow-sm me-3"
                role="status"
                aria-hidden="true"
              ></span>
              Unable to save on v-dashboard...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
