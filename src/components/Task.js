import React, { useState } from "react";

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

function Task(props) {
  const [task, setTask] = useState("");

  // updating database when task deleted
  const deleteTaskOnDatabase = () => {};

  // updating database when task changed - onblur
  // const updateTaskOnDatabase = async () => {
  //   console.log("Updating task on database");
  //   console.log(websites);
  //   try {
  //     await setDoc(
  //       doc(
  //         db,
  //         getAuth().currentUser.email + "/dashboard/todo",
  //         websiteTitleRef.current.values
  //       ),
  //       {
  //         Name: websiteTitleRef.current.value,
  //         Link: websiteUrlRef.current.value,
  //       }
  //     );
  //     getUserData();
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //     alert("Incountered some issue while adding website");
  //   }
  // };

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
          className="form-control"
          aria-label="Text input with checkbox"
          value={task}
          onChange={handleOnTaskChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          <i className="bi bi-x-circle-fill"></i>
        </button>
      </div>
    </div>
  );
}

export default Task;
