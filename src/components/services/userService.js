import jwtDecode from "jwt-decode";
import FormData from "form-data";
import http from "./http";
import { saveKey, getKey, removeKey, setKey } from "./storageService";

const api = process.env.REACT_APP_API_ENDPOINT;
const errorMessage = "Something went wrong";

export async function login(user) {
  try {
    const { data } = await http.post(`${api}/auth`, user);
    saveKey(data);
  } catch (err) {
    if (err.response) {
      return { isExpected: true, err: err.response.data };
    }
    return { err: errorMessage };
  }
}

export async function register(user) {
  try {
    const response = await http.post(`${api}/users`, user);
    saveKey(response.headers["x-auth-token"]);
  } catch (err) {
    if (err.response) {
      return { isExpected: true, err: err.response.data };
    }
    return { err: errorMessage };
  }
}

export function getCurrentUser() {
  try {
    setKey();
    const key = getKey();
    const user = jwtDecode(key);
    return user;
  } catch (err) {}
}

export async function getUserProfile() {
  try {
    const { _id } = getCurrentUser();
    const { data: user } = await http.get(`${api}/users/${_id}`);
    return { user };
  } catch (err) {
    return { err: errorMessage };
  }
}

export async function getUserProfileById(userId) {
  try {
    setKey();
    const { data: user } = await http.get(`${api}/users/${userId}`);
    return { user };
  } catch (err) {
    if (err.response) return { isExpected: true, err: err.response.data };

    return { err: errorMessage };
  }
}

export async function setUserNotificationsRead() {
  const result = await setUserProfile(undefined, undefined, undefined, 0);

  return result;
}

export async function setUserConversationRead(unreadConversation) {
  const result = await setUserProfile(
    undefined,
    undefined,
    undefined,
    undefined,
    unreadConversation
  );

  return result;
}

export async function setUserProfile(
  image,
  status,
  city,
  unreadNotifications,
  unreadConversation
) {
  try {
    const data = new FormData();
    if (image) data.append("imageUrl", image);
    if (status) data.append("status", status);
    if (city) data.append("city", city);
    if (unreadNotifications !== undefined)
      data.append("unreadNotifications", unreadNotifications);
    if (unreadConversation !== undefined)
      data.append("unreadConversation", unreadConversation);

    await http.put(`${api}/users`, data);
  } catch (err) {
    if (err.response) return { isExpected: true, err: err.response.data };
    return { err: errorMessage };
  }
}

export function removeUser() {
  removeKey();
}

export async function getUserByEmail(email) {
  try {
    const { data: user } = await http.get(`${api}/users?email=${email}`);
    return { user };
  } catch (err) {
    if (err.response) return { isExpected: true, err: err.response.data };
    return { err: errorMessage };
  }
}

export async function getRequestsSent() {
  const { user, err } = await getUserProfile();
  if (err) return { err };

  const { result: connections, err: userError } = await getProfiles(
    user.requestsMade
  );

  if (userError) return { err: userError };
  return { connections: connections || [] };
}

export async function getRequestsReceived() {
  const { user, err } = await getUserProfile();
  if (err) return { err };

  const { result: connections, err: userError } = await getProfiles(
    user.requestsReceived
  );

  if (userError) return { err: userError };
  return { connections: connections || [] };
}

export async function getProfiles(userIdArray) {
  const result = [];

  if (!userIdArray) return { result };

  for (let id of userIdArray) {
    const { user, err } = await getUserProfileById(id);
    if (err) return { err };
    result.push(user);
  }

  result.sort((p1, p2) => {
    if (p1.name > p2.name) return 1;
    if (p1.name < p2.name) return -1;
    return 0;
  });

  return { result };
}
