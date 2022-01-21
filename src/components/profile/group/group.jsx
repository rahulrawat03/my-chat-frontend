import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/loader";
import Image from "./groupImage";
import GroupDetails from "./groupDetails";
import GroupMembers from "./groupMembers";
import ManageMembers from "./manageMembers";
import Confirm from "../../modals/common/confirm";
import useAsync from "../../hooks/useAsync";
import notificationContext from "../../contexts/notification";
import userContext from "../../contexts/user";
import {
  getConversationProfile,
  setConversationProfile,
  deleteGroup,
  removeGroupMember,
} from "../../services/conversationService";
import {
  getConversation,
  removeConversation,
} from "../../services/storageService";
import { conversationEmitter } from "../../services/socket";
import "../common/common.css";
import "./group.css";

function Group({ groupId }) {
  const [group, setGroup] = useState({
    name: "",
    about: "",
    imageUrl: "",
    admin: "",
    members: [],
  });

  const [image, setImage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, makeAdmin] = useState(false);
  const [manageMembers, setManageMembers] = useState(false);
  const [error, setError] = useState("");
  const [confirmDeletion, showConfirmDeletion] = useState(false);
  const { currentUser } = useContext(userContext);
  const handleNotification = useContext(notificationContext);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: target }) => {
    const updatedGroup = { ...group };
    if (target.name === "name") updatedGroup.name = target.value;
    else if (target.name === "about") updatedGroup.about = target.value;

    setGroup(updatedGroup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await setConversationProfile(
      groupId,
      group.name,
      group.about,
      image
    );

    if (result) handleNotification(result.err, false);
    else {
      handleNotification("Details updated", true);
      navigate("/", { replace: true });
    }
  };

  const handleMembersChange = async () => {
    const { conversation: updatedGroup, err } = await getConversationProfile(
      groupId
    );

    if (err) setError(err);
    else setGroup(updatedGroup);
  };

  const removeGroup = async () => {
    const { admin, name, members } = group;

    const err = await deleteGroup(groupId, admin, name, members);
    if (err) setError(err);
    else {
      deleteConversation();
      const membersId = members.map((m) => m.memberId);
      conversationEmitter(admin, groupId, membersId);
    }
  };

  const quitGroup = async () => {
    const err = await removeGroupMember(groupId, currentUser._id);
    if (err) setError(err);
    else deleteConversation();
  };

  const deleteConversation = () => {
    if (getConversation() === groupId) {
      removeConversation();
    }

    handleNotification("Group deleted", true);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (currentUser?._id === group.admin) makeAdmin(true);
  }, [currentUser, group]);

  const asyncFunction = useCallback(
    () => getConversationProfile(groupId),
    [groupId]
  );

  const onSuccess = useCallback(
    (data) => {
      const { conversation: group, err } = data;
      if (err) navigate("/not-found", { state: { err }, replace: true });
      else {
        setGroup(group);
        setLoaded(true);
      }
    },
    [navigate]
  );

  useAsync(asyncFunction, onSuccess);

  if (!loaded) return <Loader />;
  if (error) return null;

  return (
    <section className="profile-container">
      <form onSubmit={handleSubmit}>
        <div className="profile group__profile">
          <Image
            group={group}
            setImage={setImage}
            setGroup={setGroup}
            isAdmin={isAdmin}
          />
          <GroupDetails
            group={group}
            onChange={handleChange}
            isAdmin={isAdmin}
          />
        </div>
        <GroupMembers members={group.members} />
        {isAdmin && (
          <div className="group__buttons">
            <button
              type="button"
              className="btn__profile btn__group btn__group--delete"
              onClick={() => showConfirmDeletion(true)}
            >
              delete
            </button>
            <button
              type="button"
              className="btn__profile btn__group btn__group--manage"
              onClick={() => setManageMembers(true)}
            >
              manage
            </button>
            <button
              type="submit"
              className="btn__profile btn__group btn__group--save"
            >
              save
            </button>
          </div>
        )}
        {!isAdmin && (
          <button
            type="button"
            className="btn__profile btn__group btn__group--leave"
            onClick={quitGroup}
          >
            leave
          </button>
        )}
        {manageMembers && (
          <ManageMembers
            groupId={groupId}
            groupName={group.name}
            members={group.members}
            setManageMembers={setManageMembers}
            onMembersChange={handleMembersChange}
          />
        )}
        {confirmDeletion && (
          <Confirm
            name={group.name}
            imageUrl={group.imageUrl}
            removeConversation={removeGroup}
            showConfirmDeletion={showConfirmDeletion}
          />
        )}
      </form>
    </section>
  );
}

export default Group;
