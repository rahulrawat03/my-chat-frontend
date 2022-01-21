import { useState, useEffect, useContext } from "react";
import Profile from "./profile";
import notificationContext from "../../contexts/notification";
import { getProfiles } from "../../services/userService";

function Friends({ user, members, setMembers, className }) {
  const handleNotification = useContext(notificationContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const setUserFriends = async () => {
      const { result: friendProfiles, err } = await getProfiles(user?.friends);

      if (err) handleNotification(err, false);
      else setFriends(friendProfiles);
    };

    setUserFriends();
  }, [handleNotification, user]);

  return (
    <div className={`modal__body ${className}`}>
      {friends.map((friend) => (
        <Profile
          key={friend._id}
          user={friend}
          members={members}
          setMembers={setMembers}
        />
      ))}
    </div>
  );
}

export default Friends;
