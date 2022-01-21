import { useState, useEffect, useCallback, useContext } from "react";
import Friends from "../../modals/group/friends";
import notificationContext from "../../contexts/notification";
import { getUserProfile } from "../../services/userService";
import { updateGroupMembers } from "../../services/conversationService";
import "./manageMembers.css";

function ManageMembers({
  groupId,
  groupName,
  members,
  setManageMembers,
  onMembersChange,
}) {
  const [user, setUser] = useState({});
  const [oldMembersId, setOldMembersId] = useState([]);
  const [membersId, setMembersId] = useState([]);
  const handleNotification = useContext(notificationContext);

  const saveMembers = async () => {
    const totalMembers = membersId.length;
    if (totalMembers < 3) {
      handleNotification("A group must have at least 3 members", false);
      setUserAndInitialMembers();
      return;
    }

    if (totalMembers > 10) {
      handleNotification("A group can have a maximum of 10 members", false);
      return;
    }

    setManageMembers(false);

    const err = await updateGroupMembers(
      groupId,
      groupName,
      oldMembersId,
      membersId
    );
    if (err) handleNotification(err, false);
    else onMembersChange();
  };

  const setUserAndInitialMembers = useCallback(async () => {
    const oldMembersId = members.map((m) => m.memberId);
    setOldMembersId(oldMembersId);
    setMembersId(oldMembersId);

    const { user, err } = await getUserProfile();
    if (err) handleNotification(err, false);
    else setUser(user);
  }, [members, handleNotification]);

  useEffect(() => {
    setUserAndInitialMembers();
  }, [setUserAndInitialMembers]);

  return (
    <section className="manage-members">
      <Friends
        user={user}
        members={membersId}
        setMembers={setMembersId}
        className={"manage-members__modal"}
      />
      <div className="manage-members__buttons">
        <button
          type="button"
          className="btn__manage-members change-members"
          onClick={saveMembers}
        >
          change
        </button>
        <button
          type="button"
          className="btn__manage-members cancel-change"
          onClick={() => setManageMembers(false)}
        >
          cancel
        </button>
      </div>
    </section>
  );
}

export default ManageMembers;
