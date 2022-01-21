import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../services/userService";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const { user } = await getUserProfile();
      setUser(user);
    };

    getUser();
  }, []);

  if (!user) return null;

  return (
    <div className="user">
      <Link to="/me">
        <img
          src={user.imageUrl || "/images/profile.png"}
          alt="account"
          className="sidebar__header__image"
        />
      </Link>
      <h2 className="username">{user.name}</h2>
    </div>
  );
}

export default Profile;
