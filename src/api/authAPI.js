import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const authAPI = {
  login: (account) => {
    return axiosClient.post(URL.LOGIN_URL, account);
  },

  logout: () => {
    return axiosClient.post(URL.LOGOUT_URL);
  },

  updateUser: (info) => {
    return axiosClient.put(URL.UPDATE_USER_URL, info);
  },
  getInfoUser: (id) => {
    let url;
    if (id) {
      url = `${URL.GET_INFO_URL}/${id}`;
    } else {
      url = URL.GET_INFO_URL;
    }
    return axiosClient.get(url);
  },

  register: (info) => {
    return axiosClient.post(URL.REGISTER_URL, info);
  },
  forgotPassword: (data) => {
    const url = `${URL.FORGOT_URL}/${data.email}`;
    return axiosClient.post(url);
  },
  resetPassword: (data) => {
    const newData = {
      password: data.newPassword,
      passwordToken: data.passwordToken,
    };
    return axiosClient.put(URL.RESET_URL, newData);
  },
};
export default authAPI;
