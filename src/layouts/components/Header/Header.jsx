import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import images from "~/images";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  PictureOutlined,
  FolderOpenOutlined,
  BellOutlined,
} from "@ant-design/icons";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);
const Header = ({ children }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://vacation-backend.onrender.com/vacation?page=1&type=newFeed`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRrdWJhc2kiLCJpYXQiOjE2ODcyNDMzMDksImV4cCI6MTY4NzMyOTcwOX0.0kU_9uMmJqeA1d_BWvEnYdAb_WSuWlpeM-gMN_oiBRE",
          },
        }
      );
      setSuggestions(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

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
                  fetchData();
                  setValue(e.target.value);
                  setHideSuggestions(false);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setHideSuggestions(true);
                  }, 100);
                }}
              />
              <div className="bar">
                {!hideSuggestions && (
                  <div>
                    <ul>
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          onClick={() => {
                            setValue(suggestion.title);
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
            <div className={cx("nav-tools")}>
              <HomeOutlined />
              <PictureOutlined />
              <FolderOpenOutlined />
              <BellOutlined />
            </div>
            <div className={cx("nav-user")}>
              <div className={cx("nav-user-ava")}></div>
              <div className={cx("nav-user-name")}></div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;
