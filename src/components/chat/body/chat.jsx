import { useState, useEffect, useContext, useCallback } from "react";
import Header from "../header/header";
import Messages from "./messages";
import Footer from "../footer/footer";
import Empty from "./empty";
import Loader from "../../loader/loader";
import useAsync from "../../hooks/useAsync";
import notificationContext from "../../contexts/notification";
import userContext from "../../contexts/user";
import conversationContext from "../../contexts/conversation";
import {
  sendMessageInConversation,
  getMessagesForConversation,
  getDateTime,
} from "../../services/messageService";
import {
  addMessageListener,
  removeMessageListener,
} from "../../services/socket";
import { chatEmitter } from "../../services/socket";
import "./chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(true);
  const { currentUser } = useContext(userContext);
  const handleNotification = useContext(notificationContext);
  const { conversationId, getConversationId } = useContext(conversationContext);

  useEffect(() => {
    chatEmitter(currentUser._id);
    addMessageListener(setNewMessage);
    return removeMessageListener;
  }, [currentUser._id]);

  useEffect(() => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  }, [messages, newMessage]);

  const asyncFunction = useCallback(async () => {
    const convId = conversationId || getConversationId();
    const { messages, err } = await getMessagesForConversation(
      currentUser._id,
      convId
    );

    if (err) throw new Error(err);
    return messages;
  }, [currentUser, conversationId, getConversationId]);

  const onSuccess = useCallback((messages) => {
    if (messages) setMessages(messages);
    setLoaded(true);
    setError(false);
  }, []);

  const onFailure = useCallback((err) => {
    setLoaded(true);
    setError(true);
  }, []);

  useAsync(asyncFunction, onSuccess, onFailure);

  const handleSubmit = async (message) => {
    const { date, time } = getDateTime(Date.now());
    const updatedMessages = [...messages];
    updatedMessages.push({
      own: true,
      content: message,
      date,
      time,
      senderName: currentUser.name,
    });

    setMessages(updatedMessages);

    const err = await sendMessageInConversation(
      message,
      conversationId,
      currentUser._id,
      currentUser.name
    );

    if (err) {
      setMessages(updatedMessages.slice(0, updatedMessages.length - 1));
      handleNotification(err, false);
    }
  };

  if (!loaded) return <Loader />;
  if (!conversationId || error) return <Empty />;

  return (
    <section className="chat">
      <Header />
      <Messages messages={messages} />
      <Footer handleSubmit={handleSubmit} />
    </section>
  );
}

export default Chat;
