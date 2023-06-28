import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const vacationAPI = {
  getDetailVacation: (id) => {
    const url = `${URL.VACATION_URL}/${id}`;
    return axiosClient.get(url);
  },
  getManyPosts: (data) => {
    const url = `${URL.POST_URL}?type=${data.type}&id=${data.id}&page=${data.page}`;
    return axiosClient.get(url);
  },
  getLikedList: (data) => {
    const url = `${URL.REACT_URL}/${data.id}?type=${data.type}&&page=${data.page}`;
    return axiosClient.get(url);
  },
  updateLike: (data) => {
    const url = `${URL.REACT_URL}/${data.id}?type=${data.type}`;
    return axiosClient.put(url);
  },
  getCommentList: (data) => {
    const url = `${URL.COMMENT_URL}/${data.id}?type=${data.type}&page=${data.page}`;
    return axiosClient.get(url);
  },
  addComment: (data) => {
    const url = `${URL.COMMENT_URL}/${data.id}?type=${data.type}`;
    return axiosClient.post(url, { content: data.content });
  },
};

export default vacationAPI;
