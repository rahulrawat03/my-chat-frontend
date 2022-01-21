import { FaTrash } from "react-icons/fa";
import "./message.css";

function Message({ _id, message, onDelete }) {
  return (
    <div className="notification__message">
      <h3 className="notification__text">{message}</h3>
      <FaTrash
        className="notification__delete-icon"
        onClick={() => onDelete(_id)}
      />
    </div>
  );
}

export default Message;
