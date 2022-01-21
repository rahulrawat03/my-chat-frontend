import { useContext } from "react";
import Message from "./message";
import sidebarContext from "../../contexts/sidebar";
import "./messages.css";

function Messages() {
  const { search, error, searchedConversations } = useContext(sidebarContext);

  if (error) return <h3 className="sidebar__error">{error}</h3>;

  return (
    <ul
      className={
        search
          ? "sidebar__messages sidebar__messages--small"
          : "sidebar__messages"
      }
    >
      {searchedConversations.map((c) => (
        <Message key={c._id} conversation={c} />
      ))}
    </ul>
  );
}

export default Messages;
