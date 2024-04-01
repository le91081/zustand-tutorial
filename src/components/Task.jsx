import PropType from "prop-types";
import classNames from "classnames";
import { useStore } from "../store";
import trash from "../assets/trash-2.svg";
import "./Task.css";

export default function Task({ id, title, state }) {
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const handleDragStart = () => {
    setDraggedTask(id);
  };

  return (
    <div className="task" draggable onDragStart={handleDragStart}>
      <div>{title}</div>
      <div className="bottomWrapper">
        <div>
          <img src={trash} onClick={() => deleteTask(id)} />
        </div>
        <div className={classNames("status", state)}>{state}</div>
      </div>
    </div>
  );
}

Task.propTypes = {
  id: PropType.number.isRequired,
  title: PropType.string.isRequired,
  state: PropType.string.isRequired,
};
