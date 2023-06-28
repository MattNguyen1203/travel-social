import classNames from "classnames/bind";
import styles from "./Posts.module.scss";

import Timeline from "../components/Timelines/Timeline";
import PostItem from "./PostItem/PostItem";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import { useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const { posts, detail } = useSelector((state) => state.vacation);
  const { postList } = posts;
  // console.log(posts);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("create-post")}>
          <Image path={detail.authorInfo.avatar} className={cx("avatar")} />
          <div onClick={handleOpenModal}>Every step is a milestone...</div>
        </div>

        <CreatePost handleCloseModal={handleCloseModal} showModal={showModal} />
        {postList.map((item, index) => (
          <PostItem postDetail={item} key={index} />
        ))}
      </div>
      <Timeline />
    </div>
  );
};

export default Posts;
