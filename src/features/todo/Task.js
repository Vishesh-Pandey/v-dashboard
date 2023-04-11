import { useDispatch } from "react-redux";
import { deleteTask } from "./todoSlice";

function Task(props) {
  const dispatch = useDispatch();
  return (
    <div className="col-12">
      <div className="input-group mb-3">
        <div className="input-group-text ">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            defaultValue=""
            aria-label="Checkbox for following text input"
          />
        </div>
        <span
          type="text"
          className="form-control"
          aria-label="Text input with checkbox"
          value={props.task.task}
        >
          {props.task.task}
        </span>
        <button
          onClick={() => {
            dispatch(deleteTask(props.task.id));
          }}
          className="btn btn-outline-secondary"
        >
          <i className="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  );
}

export default Task;
