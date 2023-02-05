import React, { useState } from "react";

function Task(props) {
  return (
    <div className="col-12">
      <div className="input-group mb-3">
        <div className="input-group-text">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            defaultValue=""
            aria-label="Checkbox for following text input"
          />
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Text input with checkbox"
          defaultValue={props.task}
        />
      </div>
    </div>
  );
}

export default Task;
