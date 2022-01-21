import {
  FaPlus,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
} from "react-icons/fa";
import "./action.css";

function Action({ type, onSuccess, onReject, className }) {
  if (type === "add")
    return (
      <div className={`action ${className}`} onClick={onSuccess}>
        <FaPlus className="action__icon user__add" />
        <p className="action__type">add</p>
      </div>
    );

  if (type === "friend")
    return (
      <div className={`action ${className}`} onClick={onSuccess}>
        <FaCheck className="action__icon user__friend" />
      </div>
    );

  if (type === "sent")
    return (
      <div className={`action ${className}`} onClick={onSuccess}>
        <FaArrowRight className="action__icon user__sent" />
        <p className="action__type">cancel</p>
      </div>
    );

  if (type === "received")
    return (
      <div className={`action__received ${className}`}>
        <div className="action" onClick={onSuccess}>
          <FaArrowLeft className="action__icon user__accept" />
          <p className="action__type">accept</p>
        </div>
        <div className="action" onClick={onReject}>
          <FaTimes className="action__icon user__reject" />
          <p className="action__type">reject</p>
        </div>
      </div>
    );

  return null;
}

export default Action;
