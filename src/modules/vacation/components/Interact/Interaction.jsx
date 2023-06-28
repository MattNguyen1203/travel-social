import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Space } from "antd";
import { useSelector } from "react-redux";
import styles from "./Interaction.module.scss";
import classNames from "classnames/bind";

import vacationAPI from "~/api/vacationAPI";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);

const Interaction = (props) => {
  const [open, setOpen] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [value, setValue] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setisComment] = useState(false);
  const { comments, postID } = props;
  const { info } = useSelector((state) => state.auth);

  // get comment list
  useEffect(() => {
    try {
      const fetchAPI = async () => {
        const res = await vacationAPI.getLikedList({
          id: postID,
          type: "post",
          page: 1,
        });

        const items = res.data.data.map((item) => {
          return {
            key: item.authorInfo._id,
            label: (
              <div className={cx("react-list-item")}>
                <Image path={item.authorInfo.avatar} alt="" />
                <span>{item.authorInfo.username}</span>
              </div>
            ),
          };
        });

        setLikedList(items);

        if (items.some((item) => item.key === info.id)) {
          setIsLiked(true);
        } else setIsLiked(false);
      };
      fetchAPI();
    } catch (error) {
      console.log(error.message);
    }
  }, [isLiked]);
  // Get comment list
  useEffect(() => {
    const fetchApi = async () => {
      const res = await vacationAPI.getCommentList({
        id: postID,
        type: "post",
        page: 1,
      });
      setCommentList(res.data.data);
    };
    fetchApi();
    setisComment(false);
  }, [isComment]);

  // set input value of comment
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  // send update comment's request
  const handleClick = async () => {
    try {
      await vacationAPI.addComment({
        id: postID,
        type: "post",
        content: value,
      });

      setisComment(true);
    } catch (error) {
      console.log(error);
    }
    setValue("");
  };

  // update like when user click icon
  const handleLike = () => {
    try {
      const fetchApi = async () => {
        await vacationAPI.updateLike({
          id: postID,
          type: "post",
          page: 1,
        });
        setIsLiked((prev) => !prev);
      };
      fetchApi();
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(isLiked);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("react")} onClick={handleLike}>
          <Dropdown
            menu={{
              items: likedList,
            }}
            overlayClassName={cx("dropdown")}
          >
            <Space>
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: isLiked && "#E66C6C" }}
              />
              <span>{likedList.length}</span>
            </Space>
          </Dropdown>
        </div>

        <div className={cx("comment")} onClick={() => setOpen((prev) => !prev)}>
          <FontAwesomeIcon icon={faMessage} />
          <span>{comments}</span>
        </div>
      </div>

      {open && (
        <div className={cx("cmt-container")}>
          <div className={cx("input-container")}>
            <div className={cx("input-content")}>
              <textarea
                value={value}
                type="text"
                placeholder="Write your comment here"
                spellCheck={false}
                onChange={handleChangeValue}
              />
            </div>
            <FontAwesomeIcon icon={faPaperPlane} onClick={handleClick} />
          </div>
          <div className={cx("cmt-list")}>
            {commentList.map((item) => {
              return (
                <div key={item._id} className={cx("cmt-item")}>
                  <Image path={item.authorInfo.avatar} alt="" />
                  <div className={cx("item-content-container")}>
                    <div className={cx("item-username")}>
                      {item.authorInfo.username}
                    </div>
                    <div className={cx("item-content")}>{item.content}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Interaction;
