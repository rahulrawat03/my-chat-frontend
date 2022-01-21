import { useState, useEffect, useCallback, useContext } from "react";
import Header from "../header/header";
import Messages from "../body/messages";
import Footer from "../footer/footer";
import Toggler from "./toggler";
import useAsync from "../../hooks/useAsync";
import userContext from "../../contexts/user";
import conversationContext from "../../contexts/conversation";
import { SidebarContext } from "../../contexts/sidebar";
import {
  getConversationsOfUser,
  setConversationInfo,
} from "../../services/conversationService";
import {
  addConversationAddListener,
  removeConversationAddListener,
  addConversationRemoveListener,
  removeConversationRemoveListener,
} from "../../services/socket";
import "./sidebar.css";

function Sidebar() {
  const [expanded, expand] = useState(false);
  const [search, showSearch] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [searchedConversations, setSearchedConversations] = useState([]);
  const [newConversation, setNewConversation] = useState("");
  const [removedConversation, setRemovedConversation] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useContext(userContext);
  const { setConversationId } = useContext(conversationContext);

  useEffect(() => {
    addConversationAddListener(setNewConversation);
    addConversationRemoveListener(setRemovedConversation, setConversationId);
    return () => {
      removeConversationAddListener();
      removeConversationRemoveListener();
    };
  }, [setConversationId]);

  useEffect(() => {
    setSearchedConversations(conversations);
  }, [conversations]);

  const asyncFunctionConversations = useCallback(
    () => getConversationsOfUser(currentUser._id),
    [currentUser]
  );

  const onSuccessConversations = useCallback((conversations) => {
    setConversations(conversations);
  }, []);

  const onFailureConversations = useCallback((err) => {
    setError("Something went wrong");
  }, []);

  useAsync(
    asyncFunctionConversations,
    onSuccessConversations,
    onFailureConversations
  );

  const asyncFunctionAddConversation = useCallback(async () => {
    if (newConversation) {
      const conversation = await setConversationInfo(
        currentUser._id,
        newConversation
      );
      return conversation;
    }
  }, [currentUser, newConversation]);

  const onSuccessAddConversation = useCallback(
    (conversation) => {
      if (conversation) {
        setConversations([conversation, ...conversations]);
        setNewConversation("");
      }
    },
    [conversations]
  );

  useAsync(asyncFunctionAddConversation, onSuccessAddConversation);

  useEffect(() => {
    if (removedConversation) {
      const updatedConversations = conversations.filter(
        (c) => c._id !== removedConversation
      );
      setConversations(updatedConversations);
      setRemovedConversation("");
    }
  }, [conversations, removedConversation]);

  return (
    <section
      className={
        expanded ? "sidebar-container" : "sidebar-container sidebar--hidden"
      }
    >
      <SidebarContext
        value={{
          search,
          showSearch,
          error,
          conversations,
          setConversations,
          searchedConversations,
          setSearchedConversations,
        }}
      >
        <section className="sidebar">
          <Header />
          <Messages />
          <Footer />
        </section>
        <Toggler expanded={expanded} expand={expand} />
      </SidebarContext>
    </section>
  );
}

export default Sidebar;
