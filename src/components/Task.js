import React, { useRef } from "react";

function Task(props) {
  const taskRef = useRef();

  const removeTask = () => {
    props.removeTaskFromDatabase(props.task.id);
    props.setTodo(props.todo.filter((task) => task.id !== props.task.id));
    console.log(props.todo);
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
          className="form-control"
          aria-label="Text input with checkbox"
          value={props.task.task}
        />
        <button onClick={removeTask} className="btn btn-outline-secondary">
          <i className="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  );
}

export default Task;
