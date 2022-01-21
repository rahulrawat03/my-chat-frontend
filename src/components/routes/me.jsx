import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Me from "../profile/me/me";
import Loader from "../loader/loader";
import userContext from "../contexts/user";

function MeRoute() {
  const { currentUser } = useContext(userContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <Loader />;

  if (currentUser) return <Me />;
  return <Navigate replace to="/" />;
}

export default MeRoute;
