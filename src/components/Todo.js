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

  // updating databases when tasks added -
  const addTaskOnDatabase = async () => {
    try {
      await setDoc(
        doc(
          db,
          getAuth().currentUser.email + "/dashboard/todo",
          todo.length.toString()
        ),
        {
          task: "",
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Incountered some issue while adding website");
    }
  };

  const addTask = () => {
    for (let i = 0; i < todo.length; i++) {
      if (todo[i] === "") {
        return;
      }
    }
    setTodo([...todo, ""]);
    addTaskOnDatabase();
    console.log(todo);
  };

  // updating database when task removed -
  const removeTaskFromDatabase = async () => {
    deleteDoc(
      doc(
        db,
        getAuth().currentUser.email + "/dashboard/todo",
        todo.length.toString()
      )
    );
  };

  const removeTask = () => {
    setTodo(todo.slice(0, -1));
    removeTaskFromDatabase();
  };

  useEffect(() => {
    const fetchTaskFromDatabase = async () => {
      const querySnapshot = await getDocs(
        collection(db, getAuth().currentUser.email + "/dashboard/todo")
      );

      let todoUpdateArray = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        todoUpdateArray.push(doc.data().task);
      });
      setTodo(todoUpdateArray);
      console.log("Todo update array");
      console.log(todoUpdateArray);
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
      {todo.map((element, index) => {
        return (
          <Task
            task={element}
            setTodo={setTodo}
            todo={todo}
            index={index}
            key={index}
          />
        );
      })}

      <div className="col-12">
        <button
          className="btn btn-outline-success w-50 rounded-end-0"
          onClick={addTask}
        >
          Add
        </button>
        <button
          className="btn btn-outline-secondary w-50 rounded-start-0"
          onClick={removeTask}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default Todo;
