import { useState, useEffect, useContext } from "react";
import Action from "./action";
import Confirm from "../common/confirm";
import notificationContext from "../../contexts/notification";
import userContext from "../../contexts/user";
import sidebarContext from "../../contexts/sidebar";
import conversationContext from "../../contexts/conversation";
import { getUserProfile } from "../../services/userService";
import {
  sendRequest,
  cancelRequest,
  acceptRequest,
  rejectRequest,
  deleteFriend,
} from "../../services/requestService";
import { setConversationInfo } from "../../services/conversationService";
import {
  getConversation,
  removeConversation,
} from "../../services/storageService";
import { conversationEmitter } from "../../services/socket";
import { postNotification } from "../../services/notificationService";

function FriendActions({ _id, name, imageUrl, className }) {
  const [friend, setFriend] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestReceived, setRequestReceived] = useState(false);
  const [confirmDeletion, showConfirmDeletion] = useState(false);
  const handleNotification = useContext(notificationContext);
  const { currentUser } = useContext(userContext);
  const sidebarObject = useContext(sidebarContext);
  const conversationObject = useContext(conversationContext);

  const sendFriendRequest = async () => {
    setRequestSent(true);

    const err = await sendRequest(_id);

    if (err) {
      handleNotification(err, false);
      setRequestSent(false);
      return;
    }

    postNotification(_id, `${currentUser.name} has sent you a friend request`);
  };

  const cancelFriendRequest = async () => {
    setRequestSent(false);

    const err = await cancelRequest(_id);

    if (err) {
      handleNotification(err, false);
      setRequestSent(true);
      return;
    }

    postNotification(_id, `${currentUser.name} has taken his request back`);
  };

  const acceptFriendRequest = async () => {
    setFriend(true);
    setRequestReceived(false);

    const { conversation, err } = await acceptRequest(_id);

    if (err) {
      handleNotification(err, false);
      setFriend(false);
      setRequestReceived(true);
      return;
    }

    const formattedConversation = await setConversationInfo(
      currentUser._id,
      conversation._id
    );

    if (sidebarObject)
      sidebarObject.setConversations([
        formattedConversation,
        ...sidebarObject.conversations,
      ]);

    postNotification(_id, `${currentUser.name} accepted your friend request`);
    conversationEmitter(
      currentUser._id,
      conversation._id,
      conversation.members,
      true
    );
  };

  const rejectFriendRequest = async () => {
    setRequestReceived(false);

    const err = await rejectRequest(_id);

    if (err) {
      handleNotification(err, false);
      setRequestReceived(true);
      return;
    }

    postNotification(
      _id,
      `${currentUser.name} has rejected your friend request`
    );
  };

  const removeFriend = async () => {
    setFriend(false);

    const { conversation, err } = await deleteFriend(_id);

    if (err) {
      handleNotification(err, false);
      setFriend(true);
      return;
    }
    if (getConversation() === conversation._id) {
      removeConversation();
      if (conversationObject) conversationObject.setConversationId("");
    }

    if (sidebarObject)
      sidebarObject.setConversations(
        sidebarObject.conversations.filter((c) => c._id !== conversation._id)
      );

    postNotification(
      _id,
      `${currentUser.name} has removed you from friend list`
    );
    conversationEmitter(
      currentUser._id,
      conversation._id,
      conversation.members
    );
  };

  useEffect(() => {
    const setRequestStatus = async () => {
      const { user, err } = await getUserProfile();
      if (err) {
        handleNotification(err, false);
        return;
      }

      setFriend(false);
      setRequestSent(false);
      setRequestReceived(false);

      if (user.friends?.includes(_id)) setFriend(true);
      else if (user.requestsMade?.includes(_id)) setRequestSent(true);
      else if (user.requestsReceived?.includes(_id)) setRequestReceived(true);
    };

    setRequestStatus();
  }, [_id, handleNotification]);

  const isRelated =
    currentUser._id === _id || friend || requestSent || requestReceived;

  return (
    <>
      {friend && (
        <Action
          type="friend"
          className={className}
          onSuccess={() => showConfirmDeletion(true)}
        />
      )}
      {requestSent && (
        <Action
          className={className}
          type="sent"
          onSuccess={cancelFriendRequest}
        />
      )}
      {requestReceived && (
        <Action
          type="received"
          className={className}
          onSuccess={acceptFriendRequest}
          onReject={rejectFriendRequest}
        />
      )}
      {!isRelated && (
        <Action
          type="add"
          className={className}
          onSuccess={sendFriendRequest}
        />
      )}

      {confirmDeletion && (
        <Confirm
          name={name}
          imageUrl={imageUrl}
          removeConversation={removeFriend}
          showConfirmDeletion={showConfirmDeletion}
        />
      )}
    </>
  );
}

export default FriendActions;
