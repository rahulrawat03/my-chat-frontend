import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import useAsync from "../../hooks/useAsync";
import userContext from "../../contexts/user";
import conversationContext from "../../contexts/conversation";
import {
  setConversationInfo,
  isGroup,
} from "../../services/conversationService";
import { getDateTime } from "../../services/messageService";
import "./conversationProfile.css";

function ConversationProfile() {
  const [group, setGroup] = useState(true);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(userContext);
  const { conversationId } = useContext(conversationContext);
  const [conversation, setConversation] = useState({});
  const [profileLink, setProfileLink] = useState("");

  useEffect(() => {
    const setLink = async () => {
      setError(false);
      const { group, err } = await isGroup(conversationId);

      if (err) {
        setError(true);
        return;
      }

      if (group) setProfileLink(`/group/${conversationId}`);
      else setProfileLink(`/users/${conversation.friendId}`);

      setGroup(group);
    };

    setLink();
  }, [conversationId, conversation]);

  const asyncFunction = useCallback(
    () => setConversationInfo(currentUser._id, conversationId),
    [currentUser, conversationId]
  );

  const onSuccess = useCallback(
    (data) => {
      const { name, imageUrl, lastSeen, friendId } = data;
      const { date, time, isOnline } = getDateTime(lastSeen);

      let formattedLastSeen;
      if (!group) {
        formattedLastSeen = isOnline ? "Online" : `Last active ${time} ${date}`;
      } else {
        formattedLastSeen = "";
      }

      setConversation({
        name,
        imageUrl,
        lastSeen: formattedLastSeen,
        friendId,
      });
    },
    [group]
  );

  useAsync(asyncFunction, onSuccess);

  if (error) return null;

  return (
    <div className="conversation__profile">
      <Link to={profileLink} className="conversation__profile__link">
        <img
          src={conversation.imageUrl || "/images/profile.png"}
          alt="receiver profile"
          className="chat__profile__image"
        />
      </Link>
      <Link to={profileLink} className="conversation__profile__link">
        <h2 className="chat__profile__title">
          {conversation.name}
          <p>{conversation.lastSeen}</p>
        </h2>
      </Link>
    </div>
  );
}

export default ConversationProfile;
