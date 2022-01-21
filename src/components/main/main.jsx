import { useEffect, useState } from "react";
import Sidebar from "../sidebar/common/sidebar";
import Chat from "../chat/body/chat";
import { ConversationContext } from "../contexts/conversation";
import { setUserConversationRead } from "../services/userService";
import { getConversation, saveConversation } from "../services/storageService";
import "./main.css";

function Main() {
  const [conversationId, setConvId] = useState("");

  const getConversationId = () => {
    const convId = getConversation();
    setConvId(convId);
    return convId;
  };

  const setConversationId = (convId) => {
    setConvId(convId);
    saveConversation(convId);
  };

  useEffect(() => {
    const setConversationRead = async () => {
      const convId = getConversation();
      if (convId) setUserConversationRead(convId);
    };

    setConversationRead();
  }, []);

  return (
    <main className="main">
      <ConversationContext
        value={{ conversationId, getConversationId, setConversationId }}
      >
        <Sidebar />
        <Chat />
      </ConversationContext>
    </main>
  );
}

export default Main;
