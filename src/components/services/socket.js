import { io } from "socket.io-client";
import { getConversation, removeConversation } from "./storageService";
import { getDateTime } from "./messageService";

const socket = io.connect(process.env.REACT_APP_BACKEND);

export function chatEmitter(userId) {
  socket.emit("chat", { userId });
}

export function messageEmitter(
  conversationId,
  senderId,
  senderName,
  receiversId,
  content
) {
  const createdAt = Date.now();
  const payload = {
    conversationId,
    senderId,
    senderName,
    receiversId,
    content,
    createdAt,
  };

  socket.emit("message", payload);
}

function messageHandler(payload, setNewMessage) {
  const { conversationId, senderName, content, createdAt } = payload;
  const { date, time } = getDateTime(createdAt);

  if (getConversation() !== conversationId) return;

  const message = { senderName, content, date, time, own: false };
  setNewMessage(message);
}

export function addMessageListener(setNewMessage) {
  socket.on("message", (payload) => messageHandler(payload, setNewMessage));
}

export function removeMessageListener() {
  socket.off("message");
}

export function notificationEmitter(receiverId) {
  socket.emit("notification", { receiverId });
}

export function addNotificationListener(setNewNotification) {
  socket.on("notification", () => setNewNotification(true));
}

export function removeNotificationListener() {
  socket.off("notification");
}

export function conversationEmitter(
  creatorId,
  conversationId,
  members,
  isCreated
) {
  let membersId = [];

  try {
    membersId = members.filter((m) => m !== creatorId);
  } catch (err) {
    return;
  }

  const payload = { membersId, conversationId };
  if (isCreated) socket.emit("addConversation", payload);
  else socket.emit("removeConversation", payload);
}

function conversationAddHandler(payload, setNewConversation) {
  const { conversationId } = payload;
  setNewConversation(conversationId);
}

export function addConversationAddListener(setNewConversation) {
  socket.on("addConversation", (payload) =>
    conversationAddHandler(payload, setNewConversation)
  );
}

export function removeConversationAddListener() {
  socket.off("addConversation");
}

function conversationRemoveHandler(
  payload,
  setRemovedConversation,
  setConversationId
) {
  const { conversationId } = payload;
  setRemovedConversation(conversationId);
  if (getConversation() === conversationId) {
    removeConversation();
    setConversationId("");
  }
}

export function addConversationRemoveListener(
  setRemovedConversation,
  setConversationId
) {
  socket.on("removeConversation", (payload) =>
    conversationRemoveHandler(
      payload,
      setRemovedConversation,
      setConversationId
    )
  );
}

export function removeConversationRemoveListener() {
  socket.off("removeConversation");
}

export function messageCountEmitter(conversationId, membersId) {
  socket.emit("messageCount", { conversationId, membersId });
}

export function addMessageCountListener(
  currentConversationId,
  setUnreadConversation
) {
  socket.on("messageCount", (payload) => {
    const { conversationId } = payload;
    if (
      conversationId === getConversation() ||
      conversationId !== currentConversationId
    )
      return;
    setUnreadConversation(conversationId);
  });
}

export function removeMessageCountListener() {
  socket.off("messageCount");
}
