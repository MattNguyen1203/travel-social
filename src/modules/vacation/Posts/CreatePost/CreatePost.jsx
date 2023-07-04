import Modal from "react-modal";
import styles from "./CreatePost.module.scss";
import classNames from "classnames/bind";
import Image from "~/components/Image/Image";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const cx = classNames.bind(styles);
Modal.setAppElement("#root");
const CreatePost = ({ showModal, handleCloseModal, newfeed }) => {
  const { detail } = useSelector((state) => state.vacation);
  const { authorInfo } = detail;
  const [content, setContent] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch("https://vacation-backend.onrender.com/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        authorInfo,
        content,
        resource: [],
        comments: [],
        likes: [],
        lastUpdateAt: new Date(),
        locationId: "6486f0b8bf997eadb3cfed20",
        vacationId: "6486bcc25782c2081f86fe9d",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      className={cx("modal")}
      overlayClassName={cx("overlay")}
    >
      <div className={cx("wrapper")}>
        <h2 className={cx("title")}>New Post</h2>

        <FontAwesomeIcon
          icon={faCircleXmark}
          className={cx("close-icon")}
          onClick={handleCloseModal}
        />
        <div className={cx("modal-container")}>
          <div className={cx("user-info")}>
            <div className={cx("info-name")}>
              <Image path={authorInfo && authorInfo.avatar} />
              <div className={cx("username")}>
                {authorInfo && authorInfo.username}
              </div>
            </div>
            {newfeed && (
              <div className={cx("select-vacation")}>Choose your Vacation</div>
            )}
          </div>
          <TextArea
            placeholder="What is on your mind..."
            autoSize={{
              minRows: 6,
              maxRows: 12,
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className={cx("post-extension")}>
            <div> Add on</div>
            <div className={cx("extensions")}>
              <div>
                <FontAwesomeIcon icon={faLocationDot} className={cx("icon")} />
              </div>
              <div>
                <FontAwesomeIcon icon={faImage} className={cx("icon")} />
              </div>
            </div>
          </div>
          <button onClick={handleClick} className={cx("btn-submit")}>
            Sending Post
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePost;
