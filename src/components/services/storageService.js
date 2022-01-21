import { setHttpKey } from "./http";

const KEY = "myChatJwt";
const CONV_KEY = "myChatConv";
const SEARCH_KEY = "myChatFriendSearch";
const FRIEND_MODAL_STATUS = "myChatFriendModal";
const MEMBERS_KEY = "myChatGroupMembers";
const MEMBERS_MODAL_STATUS = "myChatGroupModal";
const NOTIFICATION_MODAL_STATUS = "myChatNotificationStatus";

export function saveKey(key) {
  localStorage.setItem(KEY, key);
  setKey();
}

export function getKey() {
  return localStorage.getItem(KEY);
}

export function removeKey() {
  localStorage.removeItem(KEY);
}

export function setKey() {
  const key = getKey();
  if (key) setHttpKey(key);
  else throw new Error("No available");
}

export function saveConversation(convId) {
  localStorage.setItem(CONV_KEY, convId);
}

export function getConversation() {
  return localStorage.getItem(CONV_KEY);
}

export function removeConversation() {
  localStorage.removeItem(CONV_KEY);
}

export function saveSearch(search) {
  localStorage.setItem(SEARCH_KEY, search);
}

export function getSearch() {
  return localStorage.getItem(SEARCH_KEY);
}

export function removeSearch() {
  localStorage.removeItem(SEARCH_KEY);
}

export function saveFriendModal(value) {
  saveModal("friend", value);
}

export function getFriendModal() {
  return getModal("friend");
}

export function saveMembers(members) {
  const membersAsString = JSON.stringify(members);
  localStorage.setItem(MEMBERS_KEY, membersAsString);
}

export function getMembers() {
  const membersAsString = localStorage.getItem(MEMBERS_KEY);
  if (!membersAsString) return;
  return JSON.parse(membersAsString);
}

export function removeMembers() {
  localStorage.removeItem(MEMBERS_KEY);
}

export function saveGroupModal(value) {
  saveModal("group", value);
}

export function getGroupModal() {
  return getModal("group");
}

export function saveNotificationModal(value) {
  saveModal("notification", value);
}

export function getNotificationModal() {
  return getModal("notification");
}

function saveModal(type, value) {
  let key;
  if (type === "friend") key = FRIEND_MODAL_STATUS;
  else if (type === "group") key = MEMBERS_MODAL_STATUS;
  else if (type === "notification") key = NOTIFICATION_MODAL_STATUS;

  if (value) localStorage.setItem(key, "true");
  else localStorage.removeItem(key);
}

function getModal(type) {
  let key;
  if (type === "friend") key = FRIEND_MODAL_STATUS;
  else if (type === "group") key = MEMBERS_MODAL_STATUS;
  else key = NOTIFICATION_MODAL_STATUS;

  return localStorage.getItem(key);
}
