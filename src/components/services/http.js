import axios from "axios";

axios.interceptors.response.use(null, (err) => {
  const expected =
    err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expected) console.log("Unexpected Error");
  return Promise.reject(err);
});

export function setHttpKey(key) {
  axios.defaults.headers.common["x-auth-token"] = key;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
