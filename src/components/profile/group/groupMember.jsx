import { Link } from "react-router-dom";
import "./groupMember.css";

function GroupMember({ member }) {
  const { memberId, imageUrl, name, isAdmin } = member;

  return (
    <Link to={`/users/${memberId}`} className="link">
      <div className="member">
        <img
          src={imageUrl || "/images/profile.png"}
          alt="member"
          className="member__image"
        />
        <h3 className="member__name">{name}</h3>
        {isAdmin && (
          <p className="member__admin">
            <span>A</span>
          </p>
        )}
      </div>
    </Link>
  );
}

export default GroupMember;
