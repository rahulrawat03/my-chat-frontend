import http from "./http";

const api = `${process.env.REACT_APP_API_ENDPOINT}/users`;
const errorMessage = "Something went wrong";

export async function sendRequest(sendId) {
  try {
    await http.put(api, { sendId });
  } catch (err) {
    if (err.response) return err.response.data;
    return errorMessage;
  }
}

export async function cancelRequest(cancelId) {
  try {
    await http.put(api, { cancelId });
  } catch (err) {
    if (err.response) return err.response.data;
    return errorMessage;
  }
}

export async function acceptRequest(acceptId) {
  try {
    const { data: conversation } = await http.put(api, { acceptId });
    return { conversation };
  } catch (err) {
    if (err.response) return { isExpected: true, err: err.response.data };
    return { err: errorMessage };
  }
}

export async function rejectRequest(rejectId) {
  try {
    await http.put(api, { rejectId });
  } catch (err) {
    if (err.response) return err.response.data;
    return errorMessage;
  }
}

export async function deleteFriend(deleteId) {
  try {
    const { data: conversation } = await http.put(api, { deleteId });
    return { conversation };
  } catch (err) {
    if (err.repsonse) return { isExpected: true, err: err.response.data };
    return { err: errorMessage };
  }
}
