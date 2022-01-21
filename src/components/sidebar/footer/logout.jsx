import { useContext } from "react";
import userContext from "../../contexts/user";
import { removeKey, removeConversation } from "../../services/storageService";
import "./logout.css";

function Logout() {
  const { setCurrentUser } = useContext(userContext);

  const logout = () => {
    removeKey();
    removeConversation();
    setCurrentUser(null);
  };

  return (
    <button className="btn__logout" onClick={logout}>
      Logout
    </button>
  );
}

export default Logout;
