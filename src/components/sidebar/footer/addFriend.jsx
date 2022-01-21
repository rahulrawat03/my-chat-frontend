import { useState, useEffect } from "react";
import Add from "./add";
import Friend from "../../modals/friend/friend";
import { saveFriendModal, getFriendModal } from "../../services/storageService";

function AddFriend() {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = (value) => {
    saveFriendModal(value);
    setModalOpened(value);
  };

  useEffect(() => {
    const modalOpened = Boolean(getFriendModal());
    setModalOpened(modalOpened);
  }, []);

  return (
    <>
      <Add
        imageSource="/images/addFriend.svg"
        alt="add new friend"
        tip="add friend"
        onClick={() => openModal(true)}
      />
      <Friend modalOpened={modalOpened} openModal={openModal} />
    </>
  );
}

export default AddFriend;
