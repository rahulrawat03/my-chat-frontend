import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaCheck } from "react-icons/fa";
import notificationContext from "../../contexts/notification";
import "./profile.css";
import { saveMembers } from "../../services/storageService";

const MAX_MEMBERS = 10;

function Profile({ user, members, setMembers }) {
  const handleNotification = useContext(notificationContext);
  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    if (members.length >= MAX_MEMBERS) {
      handleNotification("Group can have a maximum of 10 members", false);
      return;
    }

    setAdd(true);
    const newMembers = [...members, user._id];
    saveMembers(newMembers);
    setMembers(newMembers);
  };

  const handleRemove = () => {
    setAdd(false);
    const newMembers = members.filter((m) => m !== user._id);
    saveMembers(newMembers);
    setMembers(newMembers);
  };

  useEffect(() => {
    if (members.includes(user._id)) setAdd(true);
  }, [user, members]);

  const { _id, name, imageUrl } = user;

  return (
    <div className="group__friend__profile">
      <Link to={`/users/${_id}`} className="link">
        <img
          src={imageUrl || "/images/profile.png"}
          alt={name}
          className="friend__profile__image"
        />
      </Link>
      <Link to={`/users/${_id}`} className="link group__friend__name">
        <h3>{name}</h3>
      </Link>
      {!add && (
        <FaPlus className="group__action add-to-group" onClick={handleAdd} />
      )}
      {add && (
        <FaCheck
          className="group__action remove-from-group"
          onClick={handleRemove}
        />
      )}
    </div>
  );
}

export default Profile;
