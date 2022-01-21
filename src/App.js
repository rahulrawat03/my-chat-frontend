import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notification from "./components/notification/notification";
import Main from "./components/routes/main";
import Me from "./components/routes/me";
import Friend from "./components/routes/friend";
import Group from "./components/routes/group";
import NotFound from "./components/routes/notFound";
import { NotificationContext } from "./components/contexts/notification";
import { UserContext } from "./components/contexts/user";
import { getCurrentUser } from "./components/services/userService";

import "./App.css";

function App() {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSuccess, setSuccess] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleNotification = (message, isSuccess) => {
    setNotificationMessage(message);
    setSuccess(isSuccess);

    const timer = setInterval(() => {
      setNotificationMessage("");
      setSuccess(null);

      clearTimeout(timer);
    }, 3000);
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setCurrentUser(currentUser);
  }, []);

  return (
    <BrowserRouter>
      <main className="app">
        <NotificationContext value={handleNotification}>
          <UserContext value={{ currentUser, setCurrentUser }}>
            {notificationMessage && (
              <Notification
                message={notificationMessage}
                type={isSuccess ? "success" : "danger"}
              />
            )}
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/me" element={<Me />} />
              <Route path="/users/:userId" element={<Friend />} />
              <Route path="/group/:groupId" element={<Group />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserContext>
        </NotificationContext>
      </main>
    </BrowserRouter>
  );
}

export default App;
