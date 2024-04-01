import { useState } from "react";
import { nanoid } from "nanoid";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useStore } from "../store";
import Task from "./Task";
import "./Column.css";

export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const draggedTask = useStore((store) => store.draggedTask);
  const addTask = useStore((store) => store.addTask);
  const moveTask = useStore((store) => store.moveTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const handleSubmit = () => {
    addTask(text, state, nanoid());
    setText("");
    setOpen(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDrop(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrop(false);
  };

  const handleDrop = () => {
    moveTask(draggedTask, state);
    setDraggedTask(null);
    setDrop(false);
  };

  return (
    <div
      className={classNames("column", { drop })}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
      {open && (
        <div className="modal">
          <div className="modalContent">
            <input onChange={(e) => setText(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

Column.propTypes = {
  state: PropTypes.string.isRequired,
};
