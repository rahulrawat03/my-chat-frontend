import { useState, useEffect } from "react";
import Add from "./add";
import Group from "../../modals/group/group";
import { saveGroupModal, getGroupModal } from "../../services/storageService";

function CreateGroup() {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = (value) => {
    saveGroupModal(value);
    setModalOpened(value);
  };

  useEffect(() => {
    const modalOpened = Boolean(getGroupModal());
    setModalOpened(modalOpened);
  }, []);

  return (
    <>
      <Add
        imageSource="/images/createGroup.svg"
        alt="create new group"
        tip="create group"
        onClick={() => openModal(true)}
      />
      <Group modalOpened={modalOpened} openModal={openModal} />
    </>
  );
}

export default CreateGroup;
