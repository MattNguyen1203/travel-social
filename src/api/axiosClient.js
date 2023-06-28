// api/axiosClient.js
import axios from "axios";

// Set up default config for http requests here
export const source = axios.CancelToken.source();
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // cancelToken: source.token,
  headers: {
    "content-type": "application/json",
  },
});
axiosClient.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    // if (response && response.data) {
    //   return response.data;
    // }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosClient;
