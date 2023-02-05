import React, { useState } from "react";

function Todo() {
  const [task, setTask] = useState([]);

  const addTask = () => {
    setTask([...task, "This"]);
  };

  const handleOnChange = () => {
    setTask(task);
  };

  return (
    <div className="row">
      <div className="col-12 py-2">Todo</div>
      {task.map((element, index) => {
        return (
          <div className="col-12" key={index}>
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
                value={element}
                onChange={handleOnChange}
              />
            </div>
          </div>
        );
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
