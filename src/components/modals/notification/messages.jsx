import { useState, useCallback, useContext } from "react";
import Message from "./message";
import useAsync from "../../hooks/useAsync";
import userContext from "../../contexts/user";
import {
  getNotifications,
  deleteNotification,
  deleteAllNotifications,
} from "../../services/notificationService";
import "./messages.css";

function Messages({ openModal }) {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const { currentUser } = useContext(userContext);

  const handleDelete = async (_id) => {
    const newNotifications = notifications.filter((n) => n._id !== _id);
    setNotifications(newNotifications);

    const err = await deleteNotification(_id);
    if (err) setError(err);
  };

  const handleAllDelete = async () => {
    setNotifications([]);
    const err = await deleteAllNotifications(currentUser._id);
    if (err) setError(err);
    else openModal(false);
  };

  const asyncFunction = useCallback(async () => {
    const { notifications, err } = await getNotifications(currentUser._id);
    if (err) throw new Error(err);

    return notifications;
  }, [currentUser]);

  const onSuccess = useCallback((notifications) => {
    setNotifications(notifications);
  }, []);

  const onFailure = useCallback((err) => {
    setError(err.message);
  }, []);

  useAsync(asyncFunction, onSuccess, onFailure);

  if (error)
    return <h3 className="modal__body modal__notification">{error}</h3>;

  if (notifications.length === 0)
    return (
      <h3 className="modal__body modal__notification">
        No notifications available
      </h3>
    );

  return (
    <div className="modal__body">
      <button className="modal__notification__clear" onClick={handleAllDelete}>
        clear all
      </button>
      {notifications.map((n) => (
        <Message
          key={n._id}
          _id={n._id}
          message={n.message}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Messages;
