import { useContext } from "react";
import AddFriend from "./addFriend";
import CreateGroup from "./createGroup";
import ManageNotification from "./manageNotification";
import Logout from "./logout";
import sidebarContext from "../../contexts/sidebar";
import "./footer.css";

function Footer() {
  const { error } = useContext(sidebarContext);

  return (
    <footer className="footer">
      {!error && (
        <>
          <AddFriend />
          <CreateGroup />
          <ManageNotification />
        </>
      )}
      <Logout />
    </footer>
  );
}

export default Footer;
