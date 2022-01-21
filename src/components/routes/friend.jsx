import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Friend from "../profile/friend/friend";
import Loader from "../loader/loader";
import userContext from "../contexts/user";

function FriendRoute() {
  const { currentUser } = useContext(userContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <Loader />;

  if (currentUser) return <Friend />;
  return <Navigate replace to="/" />;
}

export default FriendRoute;
