import { useState, useEffect, useContext } from "react";
import Image from "./image";
import conversationContext from "../../contexts/conversation";
import { setUserConversationRead } from "../../services/userService";
import {
  addMessageCountListener,
  removeMessageCountListener,
} from "../../services/socket";
import "./message.css";

function Message({ conversation: { _id, name, imageUrl, unread } }) {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadConversation, setUnreadConversation] = useState("");
  const { setConversationId } = useContext(conversationContext);

  const getUnread = () => (unreadMessages > 10 ? "10+" : unreadMessages);

  const handleConversationOpen = async () => {
    setUnreadMessages(0);
    setConversationId(_id);
    await setUserConversationRead(_id);
  };

  useEffect(() => {
    setUnreadMessages(unread || 0);
    addMessageCountListener(_id, setUnreadConversation);
    return removeMessageCountListener;
  }, [_id, unread]);

  useEffect(() => {
    if (unreadConversation) {
      setUnreadMessages(unreadMessages + 1);
      setUnreadConversation("");
    }
  }, [unreadMessages, unreadConversation]);

  return (
    <li className="user__message" onClick={handleConversationOpen}>
      <Image imageSource={imageUrl} />
      <span className="user__message__name">{name}</span>
      {Boolean(unreadMessages) && (
        <span className="user__message__unread">{getUnread()}</span>
      )}
    </li>
  );
}

export default Message;
