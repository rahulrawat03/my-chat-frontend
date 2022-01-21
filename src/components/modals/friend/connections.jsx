import { useState, useEffect, useContext } from "react";
import Profile from "./profile";
import SearchMessage from "./searchMessage";
import notificationContext from "../../contexts/notification";
import {
  getRequestsSent,
  getRequestsReceived,
} from "../../services/userService";

function Connections({ sent }) {
  const handleNotification = useContext(notificationContext);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const setUserConnections = async () => {
      let result;

      if (sent) result = await getRequestsSent();
      else result = await getRequestsReceived();

      const { connections, err } = result;
      if (err) handleNotification(err, false);
      else setConnections(connections);
    };

    setUserConnections();
  }, [handleNotification, sent]);

  return (
    <div className="friend-search">
      {connections.length === 0 && <SearchMessage message="no requests" />}
      {connections?.map((c, index) => (
        <Profile key={index} user={c} />
      ))}
    </div>
  );
}

export default Connections;
