import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Image from "./userImage";
import Details from "../common/details";
import Loader from "../../loader/loader";
import useAsync from "../../hooks/useAsync";
import { getUserProfile, setUserProfile } from "../../services/userService";
import notificationContext from "../../contexts/notification";
import "../common/common.css";
import "./me.css";

function Me() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    imageUrl: "",
    status: "",
    city: "",
  });

  const [image, setImage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const handleNotification = useContext(notificationContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await setUserProfile(image, user.status, user.city);
    if (result) handleNotification(result.err, false);
    else {
      handleNotification("Details updated", true);
      navigate("/", { replace: true });
    }
  };

  const handleChange = ({ currentTarget: target }) => {
    const updatedUser = { ...user };

    if (target.name === "status") updatedUser.status = target.value;
    else if (target.name === "city") updatedUser.city = target.value;

    setUser(updatedUser);
  };

  const onSuccess = useCallback(
    (data) => {
      const { user, err } = data;

      if (err) navigate("/not-found", { state: { err } });
      else {
        setUser(user);
        setLoaded(true);
      }
    },
    [navigate]
  );

  useAsync(getUserProfile, onSuccess);

  if (!loaded) return <Loader />;

  return (
    <section className="profile-container own-container">
      <form onSubmit={handleSubmit}>
        <div className="profile profile__own">
          <Image user={user} setImage={setImage} setUser={setUser} />
          <Details user={user} onChange={handleChange} />
        </div>
        <button type="submit" className="btn__profile btn__own">
          save
        </button>
      </form>
    </section>
  );
}

export default Me;
