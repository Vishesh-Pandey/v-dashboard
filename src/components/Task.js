import React, { useRef, useState } from "react";

import app from "../firebase";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Task(props) {
  const [task, setTask] = useState("");
  const taskRef = useRef();
  const db = getFirestore(app);

  // updating database when task changed - onblur
  const updateTaskOnDatabase = async () => {
    try {
      await setDoc(
        doc(
          db,
          getAuth().currentUser.email + "/dashboard/todo",
          props.index.toString()
        ),
        {
          task: taskRef.current.value,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Incountered some issue while adding task");
    }
    console.log(task);
  };

  const handleOnTaskChange = (event) => {
    if (event.target.value.length > 30) {
      return;
    }
    setTask(event.target.value);
    let currentTodo = props.todo;
    currentTodo[props.index] = event.target.value;
    props.setTodo(currentTodo);
  };

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
          ref={taskRef}
          onBlur={updateTaskOnDatabase}
          className="form-control"
          aria-label="Text input with checkbox"
          value={props.todo[props.index]}
          onChange={handleOnTaskChange}
        />
      </div>
    </div>
  );
}

export default Task;
