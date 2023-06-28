import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import logoImg from "~/images/Vector.png";
import images from "~/images";
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderDropdown from "./Dropdown/HeaderDropdown";
import {
  HomeOutlined,
  PictureOutlined,
  FolderOpenOutlined,
  BellOutlined,
} from "@ant-design/icons";
import axiosClient from "~/api/axiosClient";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);
const Header = ({ children }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);

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
  console.log(value);
  console.log(suggestions);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("nav")}>
          <div className={cx("nav-logo")}>
            <Image
              src={images.Vector}
              className={cx("nav-logo-img")}
              alt="????"
            />
          </div>
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
                        {suggestions.map((suggestion) => (
                          <li
                            key={suggestion.id}
                            onClick={() => {
                              setValue(suggestion);
                              setHideSuggestions(true);
                            }}
                          >
                            {suggestion.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={cx("nav-tools")}>
              <HomeOutlined />
              <PictureOutlined />
              <FolderOpenOutlined />
              <BellOutlined />
            </div>
            <div className={cx("nav-user")}>
              {/* <img src={user?.avatar} className={cx("user-ava")} alt="" />
              <div className={cx("user-fullname")}>
                <li>{user?.lastname}</li>
                <li>{user?.firstname}</li>
              </div>
              <CaretDownOutlined /> */}
              <HeaderDropdown></HeaderDropdown>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;