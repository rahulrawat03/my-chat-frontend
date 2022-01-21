import http from "./http";
import { notificationEmitter } from "./socket";

const api = process.env.REACT_APP_API_ENDPOINT;
const errorMessage = "Something went wrong";

export async function postNotification(friendId, message) {
  const data = { userId: friendId, message };
  try {
    const { data: notificationId } = await http.post(
      `${api}/notifications`,
      data
    );

    notificationEmitter(friendId);
    return { notificationId };
  } catch (err) {
    if (err.response) return { isExpected: true, err: err.response.data };
    return { err: errorMessage };
  }
}

export async function getNotifications(userId) {
  try {
    const { data: notifications } = await http.get(
      `${api}/notifications/${userId}`
    );
    return { notifications };
  } catch (err) {
    if (err.response) return { isExpected: true, err: err.response.data };
    return { err: errorMessage };
  }
}

export async function deleteNotification(notificationId) {
  try {
    await http.delete(`${api}/notifications/${notificationId}`);
    return;
  } catch (err) {
    if (err) return err.response.data;
    return errorMessage;
  }
}

export async function deleteAllNotifications(userId) {
  try {
    await http.put(`${api}/notifications/${userId}`, {
      clearNotifications: true,
    });
  } catch (err) {
    if (err) return err.response.data;
    return errorMessage;
  }
}
