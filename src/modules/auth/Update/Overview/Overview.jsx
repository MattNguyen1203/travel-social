import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import { handleAuth } from "~/store/slices/authSlice";

import Avatar from "~/components/Avatar/Avatar";
import styles from "./Overview.module.scss";
import Loading from "~/components/Loading/Loading";
import Notification from "~/components/Notifications/Notification";

const cx = classNames.bind(styles);

const Overview = () => {
  const dispatch = useDispatch();
  const { isLoading, info } = useSelector((state) => state.auth);
  const { avatar, username, firstname, lastname, description } = info;
  const [inputValue, setInputValue] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  // Set Input Value when component mounted
  useEffect(() => {
    setInputValue(description);
  }, [description]);

  // Handle Input Change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      handleAuth({
        type: "updateUser",
        data: {
          description: inputValue,
        },
      })
    );
  };

  const handleClear = () => {
    window.location.reload();
  };

  const handleFocus = () => {
    setIsChanged(true);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("userName-container")}>
        <div className={cx("avatar")}>
          <Avatar avatar={avatar} />
          {/* <img src="" alt="This is icon" /> */}
        </div>
        <div className={cx("userName")}>
          <div className={cx("sub-name")}>{username}</div>
          <div className={cx("name")}>{`${firstname} ${lastname}`}</div>
        </div>
      </div>
      <div className={cx("des-container")}>
        <div className={cx("title")}>Description</div>
        <div className={cx("des-detail")}>
          <textarea
            value={inputValue}
            onChange={handleChange}
            spellCheck={false}
            onFocus={handleFocus}
          />
        </div>
      </div>
      {isChanged && (
        <div className={cx("btn-container")}>
          <button className={cx("btn-save")} onClick={handleSubmit}>
            <span>Save change</span>
            {isLoading && <Loading />}
          </button>
          <button className={cx("btn-cancel")} onClick={handleClear}>
            <span>Cancel</span>
            {isLoading && <Loading />}
          </button>
        </div>
      )}

      <Notification />
    </div>
  );
};

export default Overview;
