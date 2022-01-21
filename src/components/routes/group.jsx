import { useState, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import Group from "../profile/group/group";
import Loader from "../loader/loader";
import useAsync from "../hooks/useAsync";
import { isGroupMember } from "../services/conversationService";
import { getCurrentUser } from "../services/userService";

function GroupRoute() {
  const { groupId } = useParams();
  const [groupMember, setGroupMember] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const asyncFunction = useCallback(async () => {
    const currentUser = getCurrentUser();
    const groupMember = await isGroupMember(groupId, currentUser?._id);
    return groupMember;
  }, [groupId]);

  const onSuccess = useCallback((groupMember) => {
    setGroupMember(groupMember);
    setLoaded(true);
  }, []);

  useAsync(asyncFunction, onSuccess);

  if (!loaded) return <Loader />;

  if (groupMember) return <Group groupId={groupId} />;
  return <Navigate replace to="/" />;
}

export default GroupRoute;
