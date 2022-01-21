import FormData from "form-data";
import _ from "lodash";
import http from "./http";
import { getUserProfileById } from "./userService";
import { postNotification } from "./notificationService";
import { setKey } from "./storageService";
import { conversationEmitter } from "./socket";

const api = process.env.REACT_APP_API_ENDPOINT;
const errorMessage = "Something went wrong";

export async function getConversationsOfUser(userId) {
  const { user } = await getUserProfileById(userId);
  const conversations = await setConversationsInfo(userId, user.conversations);

  return conversations;
}

export async function getConversationById(conversationId) {
  const { data: conversation } = await http.get(
    `${api}/conversations/${conversationId}`
  );
  return conversation;
}

export async function setConversationInfo(userId, convId, unread) {
  const conversation = await getConversationById(convId);

  const { members } = conversation;

  if (members.length === 2) {
    const friendId = members[0] === userId ? members[1] : members[0];

    const { user: friend } = await getUserProfileById(friendId);

    conversation.name = friend.name;
    conversation.friendId = friendId;
    conversation.imageUrl = friend.imageUrl;
    conversation.lastSeen = friend.lastSeen;
  }

  conversation.unread = unread;

  return conversation;
}

async function setConversationsInfo(userId, conversations) {
  const updatedConversations = [];

  if (conversations) {
    for (let conv of conversations) {
      const conversation = await setConversationInfo(
        userId,
        conv._id,
        conv.unread
      );
      updatedConversations.push(conversation);
    }
  }

  updatedConversations.sort((c1, c2) => {
    const active1 = new Date(c1.lastActive).getTime();
    const active2 = new Date(c2.lastActive).getTime();
    return active2 - active1;
  });

  return updatedConversations;
}

export async function getConversationProfile(convId) {
  try {
    setKey();
    let { data: conversation } = await http.get(
      `${api}/conversations/${convId}`
    );

    const { members, admin } = await populateInformation(
      conversation.members,
      conversation.admin
    );

    conversation.members = [admin, ..._.orderBy(members, ["name"])];

    return { conversation };
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 400 || err.response.status === 404)
    )
      return { isExpected: true, err: err.response.data };
    return { err: errorMessage };
  }
}

export async function setConversationProfile(convId, name, about, image) {
  try {
    const formData = new FormData();
    if (image) formData.append("imageUrl", image);
    if (name) formData.append("name", name);
    if (about) formData.append("about", about);

    await http.put(`${api}/conversations/${convId}`, formData);
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 400 || err.response.status === 404)
    )
      return { isExpected: true, err: err.response.data };
    return { err: errorMessage };
  }
}

async function populateInformation(members, adminId) {
  const newMembers = [];
  let admin;

  for (let member of members) {
    const { name, imageUrl } = await getDetailsOfUser(member);
    const memberObject = { memberId: member, name, imageUrl };

    if (member === adminId) admin = { ...memberObject, isAdmin: true };
    else newMembers.push(memberObject);
  }

  return { members: newMembers, admin };
}

async function getDetailsOfUser(memberId) {
  const { user } = await getUserProfileById(memberId);
  return { name: user.name, imageUrl: user.imageUrl };
}

export async function isGroup(convId) {
  try {
    const { data: conversation } = await http.get(
      `${api}/conversations/${convId}`
    );

    return { group: conversation.members.length > 2 };
  } catch (err) {
    if (err.response) {
      return { isExpected: true, err: err.response.data };
    }
    return { err: errorMessage };
  }
}

export async function createGroup(name, members, admin) {
  const data = { name, members, admin };

  try {
    const { data: conversation } = await http.post(
      `${api}/conversations`,
      data
    );

    members.forEach(async (member) => {
      if (member !== admin)
        await postNotification(member, `You have been added to ${name}`);
    });

    return { conversationId: conversation._id };
  } catch (err) {
    if (err.response) return { isExpected: true, err: err.response.data };
    return { err: errorMessage };
  }
}

export async function updateGroupMembers(
  groupId,
  groupName,
  oldMembers,
  members
) {
  try {
    await http.put(`${api}/conversations/${groupId}`, { members });

    for (let member of members) {
      if (!oldMembers.includes(member)) {
        await postNotification(member, `You have been added to ${groupName}`);
        conversationEmitter("none", groupId, [member], true);
      }
    }

    for (let member of oldMembers) {
      if (!members.includes(member)) {
        await postNotification(
          member,
          `You have been removed from ${groupName}`
        );
        conversationEmitter("none", groupId, [member]);
      }
    }
  } catch (err) {
    if (err.response) return err.repsonse.data;
    return errorMessage;
  }
}

export async function deleteGroup(groupId, adminId, groupName, membersObjects) {
  try {
    await http.delete(`${api}/conversations/${groupId}`);

    membersObjects.forEach(async (member) => {
      const { memberId } = member;

      if (memberId !== adminId)
        await postNotification(memberId, `${groupName} has been deleted`);
    });
  } catch (err) {
    if (err.response) return err.response.data;
    return errorMessage;
  }
}

export async function removeGroupMember(groupId, userId) {
  try {
    await http.put(`${api}/conversations/${groupId}`, { removeId: userId });
  } catch (err) {
    if (err.response) return err.response.data;
    return errorMessage;
  }
}

export function filterConversations(conversations, pattern) {
  const regexPattern = new RegExp(pattern, "i");

  const filteredConversations = conversations.filter((c) =>
    c.name.match(regexPattern)
  );

  return filteredConversations;
}

export async function isGroupMember(groupId, member) {
  if (!member) return false;

  const conversation = await getConversationById(groupId);
  if (!conversation) return false;

  return conversation.members.includes(member);
}
