import React, { useEffect, useState } from "react";
import Task from "./Task";

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

function Todo() {
  const db = getFirestore(app);
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");

  // updating databases when tasks added -
  const addTaskOnDatabase = async (id, task) => {
    try {
      await setDoc(
        doc(
          db,
          getAuth().currentUser.email + "/dashboard/todo",
          Date.now().toString()
        ),
        {
          id,
          task,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Incountered some issue while updating database");
    }
  };

  // updating database when task removed -
  const removeTaskFromDatabase = async (id) => {
    deleteDoc(doc(db, getAuth().currentUser.email + "/dashboard/todo", id));
  };

  const addNewTask = () => {
    let newTask = { task, id: Date.now().toString() };
    setTodo([...todo, newTask]);
    addTaskOnDatabase(newTask.id, newTask.task);
    setTask("");
  };

  useEffect(() => {
    const fetchTaskFromDatabase = async () => {
      const querySnapshot = await getDocs(
        collection(
          getFirestore(app),
          getAuth().currentUser.email + "/dashboard/todo"
        )
      );

      let todoUpdateArray = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        todoUpdateArray.push(doc.data().task);
      });
      setTodo(todoUpdateArray);
    };

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTaskFromDatabase();
      } else {
        console.log("Not able to fetch todos");
      }
    });
  }, []);

  return (
    <div className="row">
      <div className="col-12 py-2">Todo</div>
      <div className="col-12">
        <div className="input-group mb-2">
          <input
            value={task}
            onChange={(event) => setTask(event.target.value)}
            type="text"
            className="form-control"
          />
          <button onClick={addNewTask} className="btn btn-outline-secondary">
            <i class="bi bi-plus-square"></i>
          </button>
        </div>
      </div>
      {todo.map((element, index) => {
        return (
          <Task
            task={element}
            setTodo={setTodo}
            todo={todo}
            removeTaskFromDatabase={removeTaskFromDatabase}
            index={index}
            key={index}
            c
          />
        );
      })}
    </div>
  );
}

export default Todo;
