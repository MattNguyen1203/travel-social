import { Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./Vacation.module.scss";
import classNames from "classnames/bind";
import { VACATION_ALBUM_ROUTE, VACATION_POSTS_ROUTE } from "~/utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faFlag,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailVacation, getManyPosts } from "~/store/slices/vacationSlice";
import axiosClient from "~/api/axiosClient";
import Loading from "~/components/Loading/Loading";
import { getDate } from "~/helpers/function";
import { Modal, Tooltip } from "antd";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);
const Vacation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal2Open, setModal2Open] = useState(false);
  const { detail, isLoading, posts } = useSelector((state) => state.vacation);
  const { authorInfo, cover, members, title, startingTime, endingTime } =
    detail;
  const { totalPost } = posts;
  const startDate = getDate(startingTime);
  const endDate = getDate(endingTime);

  // let { vacationID } = useParams();
  // console.log(vacationID);
  // get Vacation ID
  let vacationID = "6486bcc25782c2081f86fe9d";
  const handleRoute = (url) => {
    navigate(url);
  };

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axiosClient.get(
  //       "https://vacation-backend.onrender.com/vacation?page=1&type=userProfile"
  //     );
  //     console.log(res);
  //   };

  //   fetch();
  // }, []);

  useEffect(() => {
    Promise.all([
      dispatch(getDetailVacation(vacationID)),
      dispatch(getManyPosts({ type: "vacation", id: vacationID, page: 1 })),
    ]);
  }, [vacationID]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("sidebar")}>
            <Image src={cover} alt="This is BG" className={cx("img-BG")} />
            <div className={cx("sidebar-content")}>
              <div className={cx("user-info")}>
                <div className={cx("user-index")}>
                  <div className={cx("index")}>
                    {authorInfo && authorInfo.friends}
                  </div>
                  <div className={cx("index-title")}>friends</div>
                </div>
                <div className={cx("user-avatar")}>
                  {/* <img src="" alt="" /> */}
                  <div className={cx("avatar")}></div>
                  <div className={cx("fullname")}>Ng Công Sơn</div>
                  <div className={cx("username")}>
                    {authorInfo && authorInfo.username}
                  </div>
                </div>
                <div className={cx("user-index")}>
                  <div className={cx("index")}>{totalPost}</div>
                  <div className={cx("index-title")}>Posts</div>
                </div>
              </div>
              <div className={cx("vacation-detail")}>
                <div className={cx("vacation-title")}>
                  Vacation Detail
                  <FontAwesomeIcon icon={faPen} className={cx("title-icon")} />
                </div>
                <div className={cx("vacation-info")}>
                  <div className={cx("vacation-name")}>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className={cx("icon")}
                    />
                    <Tooltip
                      title={title}
                      color="grey"
                      // overlayStyle={{ padding: "20px" }}
                      overlayInnerStyle={{
                        textAlign: "center",
                      }}
                    >
                      <span>{title}</span>
                    </Tooltip>
                  </div>

                  <div>
                    <FontAwesomeIcon icon={faFlag} className={cx("icon")} />
                    <span>Hà Nội, Việt Nam</span>
                  </div>

                  <div onClick={() => setModal2Open(true)}>
                    <FontAwesomeIcon icon={faUser} className={cx("icon")} />
                    <span>{members} people join in</span>
                  </div>
                  <Modal
                    title="Participants"
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                  >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                  </Modal>

                  <div>
                    <FontAwesomeIcon icon={faCalendar} className={cx("icon")} />
                    <span>
                      {startDate} - {endDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className={cx("route")}>
                <div
                  onClick={() => handleRoute(VACATION_POSTS_ROUTE)}
                  className={cx("active")}
                >
                  See All Posts
                </div>
                <div onClick={() => handleRoute(VACATION_ALBUM_ROUTE)}>
                  See Album
                </div>
              </div>
            </div>
          </div>
          <div className={cx("content")}>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Vacation;
