import React, { useState } from "react";
import Task from "./Task";

function Todo() {
  const [todo, setTodo] = useState([]);

  // updating databases when tasks added -
  const addTaskOnDatabase = () => {};

  const addTask = () => {
    for (let i = 0; i < todo.length; i++) {
      if (todo[i] === "") {
        return;
      }
    }
    setTodo([...todo, ""]);
    console.log(todo);
  };

  return (
    <div className="row">
      <div className="col-12 py-2">Todo</div>
      {todo.map((element, index) => {
        return <Task setTodo={setTodo} todo={todo} index={index} key={index} />;
      })}

      <div className="col-12">
        <button className="btn btn-outline-secondary w-100" onClick={addTask}>
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Todo;
