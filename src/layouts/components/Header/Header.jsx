import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import images from "~/images";
import { useEffect, useState } from "react";
import HeaderDropdown from "./Dropdown/HeaderDropdown";
import { HomeOutlined, PictureOutlined, FolderOpenOutlined, BellOutlined } from "@ant-design/icons";
import axiosClient from "~/api/axiosClient";
import Image from "~/components/Image/Image";
import { changeVisible } from "~/store/slices/notiSlice";
import { useSelector, useDispatch } from "react-redux";
import NotiList from "~/modules/notification/NotiList";
import { Badge } from "antd";
import { getList } from "~/store/slices/notiSlice";
const cx = classNames.bind(styles);

const Header = ({ children }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const { list } = useSelector((state) => state.noti);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosClient.get(
          `https://vacation-backend.onrender.com/search/user?value=${value}&page=1`
        );
        setSuggestions(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [value]);

  const handleBell = () => {
    dispatch(changeVisible());
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("nav")}>
          <a className={cx("nav-logo")} href="/">
            <Image path={images.Vector} className={cx("nav-logo-img")} alt="????" />
          </a>
          <div className={cx("nav-left")}>
            <div className={cx("nav-search")}>
              <input
                className={cx("search-input")}
                type="text"
                placeholder="# Explore..."
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setHideSuggestions(false);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setHideSuggestions(true);
                  }, 100);
                }}
              />
              <div className={cx("bar")}>
                <div className={cx("suggestions")}>
                  {!hideSuggestions && (
                    <div>
                      <ul>
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setValue(suggestion);
                              setHideSuggestions(true);
                            }}
                          >
                            {suggestion.username}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={cx("nav-tools")}>
              <a href="/">
                <HomeOutlined />
              </a>
              <a href="/profile">
                <PictureOutlined />
              </a>
              <a>
                <FolderOpenOutlined />
              </a>
              <Badge count={list.length} overflowCount={99}>
                <BellOutlined onClick={handleBell} />
              </Badge>
            </div>
            <div className={cx("nav-user")}>
              <HeaderDropdown />
            </div>
          </div>
        </div>
      </div>
      <NotiList />
      {children}
    </>
  );
};

export default Header;
