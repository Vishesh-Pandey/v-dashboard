import React, { useState } from "react";
import Task from "./Task";

function Todo() {
  const [todo, setTodo] = useState([]);

  const addTask = () => {
    setTodo([...todo, "Task..."]);
  };

  return (
    <div className="row">
      <div className="col-12 py-2">Todo</div>
      {todo.map((element, index) => {
        return <Task todo={todo} task={element} key={index} />;
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
