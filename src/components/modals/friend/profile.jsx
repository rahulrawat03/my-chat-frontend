import { Link } from "react-router-dom";
import FriendActions from "./friendActions";
import "./profile.css";

function Profile({ user }) {
  const { _id, name, imageUrl } = user;

  return (
    <div className="user-profile">
      <Link to={`/users/${_id}`} className="link user-profile__info-container">
        <img
          src={imageUrl || "/images/profile.png"}
          alt={name}
          className="user__image"
        />
        <h3 className="user__name">{name}</h3>
      </Link>
      <FriendActions _id={_id} name={name} imageUrl={imageUrl} />
    </div>
  );
}

export default Profile;
