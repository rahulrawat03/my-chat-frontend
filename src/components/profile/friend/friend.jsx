import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../loader/loader";
import Image from "./friendImage";
import Details from "../common/details";
import FriendActions from "../../modals/friend/friendActions";
import useAsync from "../../hooks/useAsync";
import { getUserProfileById } from "../../services/userService";
import "../common/common.css";
import "./friend.css";

function Friend() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    imageUrl: "",
    status: "",
    city: "",
  });

  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const asyncFunction = useCallback(() => getUserProfileById(userId), [userId]);

  const onSuccess = useCallback(
    (data) => {
      const { user, err } = data;

      if (err) navigate("/not-found", { state: { err }, replace: true });
      else {
        setUser(user);
        setLoaded(true);
      }
    },
    [navigate]
  );

  useAsync(asyncFunction, onSuccess);

  if (!loaded) return <Loader />;

  return (
    <section className="profile-container friend-container">
      <div className="profile profile__friend">
        <Image imageSource={user.imageUrl} />
        <Details user={user} isFriend={true} />
      </div>
      <FriendActions
        _id={user._id}
        name={user.name}
        imageUrl={user.imageUrl}
        className="profile__actions"
      />
    </section>
  );
}

export default Friend;
