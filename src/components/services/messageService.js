import dateFormat from "dateformat";
import http from "./http";
import { messageEmitter, messageCountEmitter } from "./socket";
import { getConversationById } from "./conversationService";

const api = `${process.env.REACT_APP_API_ENDPOINT}/messages`;
const errorMessage = "Something went wrong";

export async function getMessagesForConversation(userId, convId) {
  if (!(convId && userId)) return;

  try {
    let { data: messages } = await http.get(`${api}/${convId}`);

    messages = messages.map((m) => {
      const { date, time } = getDateTime(m.createdAt);

      const message = {
        content: m.content,
        date,
        time,
        senderName: m.senderName,
      };
      if (m.senderId === userId) message.own = true;

      return message;
    });

    return { messages };
  } catch (err) {
    if (err.response) return { isExpected: true, err: err.response.data };
    return { err: errorMessage };
  }
}

export async function sendMessageInConversation(
  content,
  convId,
  userId,
  userName
) {
  try {
    const message = {
      content,
      conversationId: convId,
      senderId: userId,
      senderName: userName,
    };

    const conversation = await getConversationById(convId);
    const receiversId = conversation.members.filter((m) => m !== userId);

    await http.post(`${api}`, message);
    messageEmitter(convId, userId, userName, receiversId, content);
    messageCountEmitter(convId, receiversId);
  } catch (err) {
    if (err.response) return err.response.data;
    return errorMessage;
  }
}

export function getDateTime(dateTime) {
  const date = dateFormat(dateTime, "dS mmmm yyyy");
  const time = dateFormat(dateTime, "hh:MM TT");

  const timeInSec = new Date(dateTime).getTime();
  const nowSec = Date.now();

  const isOnline = nowSec - timeInSec < 60_000;

  return { date, time, isOnline };
}
