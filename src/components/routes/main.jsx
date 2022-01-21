import { useContext } from "react";
import Main from "../main/main";
import Authentication from "../auth/authentication";
import userContext from "../contexts/user";

function MainRoute() {
  const { currentUser } = useContext(userContext);

  if (currentUser) return <Main />;
  return <Authentication />;
}

export default MainRoute;
