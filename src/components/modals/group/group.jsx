import { useState, useEffect, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import Header from "./header";
import Friends from "./friends";
import notificationContext from "../../contexts/notification";
import sidebarContext from "../../contexts/sidebar";
import { getUserProfile } from "../../services/userService";
import {
  createGroup,
  setConversationInfo,
} from "../../services/conversationService";
import { getMembers, removeMembers } from "../../services/storageService";
import { conversationEmitter } from "../../services/socket";
import "../common/common.css";

function Group({ modalOpened, openModal }) {
  const handleNotification = useContext(notificationContext);
  const { conversations, setConversations } = useContext(sidebarContext);
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = async (name) => {
    setError("");

    if (name === "") {
      setError("Group name cannot be empty");
      return;
    }

    if (members.length < 3) {
      setError("Group must contain at least 3 members");
      return;
    }

    const { conversationId, err } = await createGroup(name, members, user._id);

    if (err) {
      setError(err);
      return;
    }

    const conversation = await setConversationInfo(user._id, conversationId);
    setConversations([conversation, ...conversations]);
    conversationEmitter(user._id, conversationId, members, true);

    handleModalClose();
  };

  const handleModalClose = () => {
    removeMembers();
    setMembers([]);
    openModal(false);
  };

  useEffect(() => {
    const setCurrentUser = async () => {
      const { user, err } = await getUserProfile();
      if (err) handleNotification(err, false);
      else {
        setUser(user);
        const members = getMembers();
        setMembers(members || [user._id]);
      }
    };

    setCurrentUser();
  }, [handleNotification, modalOpened]);

  if (!modalOpened) return null;

  return (
    <div className="modal">
      <Header error={error} onSubmit={handleSubmit} />
      <Friends
        user={user}
        members={members}
        setMembers={setMembers}
        onSubmit={handleSubmit}
      />
      <FaTimes className="modal__close" onClick={handleModalClose} />
    </div>
  );
}

export default Group;
