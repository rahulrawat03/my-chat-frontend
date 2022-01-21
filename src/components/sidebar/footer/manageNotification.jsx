import { useState, useEffect, useCallback } from "react";
import Add from "./add";
import Notification from "../../modals/notification/notification";
import useAsync from "../../hooks/useAsync";
import {
  getNotificationModal,
  saveNotificationModal,
} from "../../services/storageService";
import {
  getUserProfile,
  setUserNotificationsRead,
} from "../../services/userService";
import {
  addNotificationListener,
  removeNotificationListener,
} from "../../services/socket";
import "./manageNotification.css";

function ManageNotification() {
  const [modalOpened, setModalOpened] = useState(false);
  const [unread, setUnread] = useState(0);
  const [newNotification, setNewNotification] = useState(false);

  const openModal = async (value) => {
    saveNotificationModal(value);
    setModalOpened(value);
    setUnread(0);

    await setUserNotificationsRead();
  };

  useEffect(() => {
    addNotificationListener(setNewNotification);
    return removeNotificationListener;
  }, []);

  useEffect(() => {
    if (newNotification) {
      setUnread(unread + 1);
      setNewNotification(false);
    }
  }, [unread, newNotification]);

  const asyncFunction = useCallback(async () => {
    const modalOpened = Boolean(getNotificationModal());
    setModalOpened(modalOpened);

    const { user, err } = await getUserProfile();
    if (err) throw new Error(err);

    return user;
  }, []);

  const onSuccess = useCallback((user) => {
    setUnread(user.unreadNotifications);
  }, []);

  const onFailure = useCallback((err) => {}, []);

  useAsync(asyncFunction, onSuccess, onFailure);

  return (
    <>
      <Add
        imageSource="/images/bell.svg"
        alt="see notifications"
        onClick={() => openModal(true)}
      >
        {Boolean(unread) && <h3 className="notifications__unread">{unread}</h3>}
      </Add>
      {modalOpened && <Notification openModal={openModal} />}
    </>
  );
}

export default ManageNotification;
