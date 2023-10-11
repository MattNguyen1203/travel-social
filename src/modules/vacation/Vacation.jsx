import { useSearchParams } from "react-router-dom";
import styles from "./Vacation.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailVacation,
  getManyPosts,
  getStatusList,
  isPostListChanged,
  setTimeline,
} from "~/store/slices/vacationSlice";
import Posts from "./Posts/Posts";
import Album from "./Album/Album";
import Preloader from "~/components/Preloader/Preloader";
import Sidebar from "./components/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import DrawerRes from "./Posts/Drawer/DrawerRes";

const cx = classNames.bind(styles);
const Vacation = () => {
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  let vacationID = searchParams.get("vacationID"); // get vacationId of url
  const urlType = searchParams.get("type") || "post"; // get type  of url (post || album)
  const currentPage = useRef(1);
  // Get detail of vacation
  const { posts } = useSelector((state) => state.vacation);
  // Get detail of posts
  const { page, pages, timeline, isUpdatePost } = posts;
  const [preload, setPreload] = useState(true);

  // for responsive
  const [resModal, setResModal] = useState(false);
  const { size } = useSelector((state) => state.general);
  const isSmallSize = size.width <= 768;
  const isMediumSize = size.width <= 992;

  // Get vacation detail & set activeTimeline
  useEffect(() => {
    setPreload(true);
    Promise.all([
      dispatch(getDetailVacation(vacationID)),
      dispatch(
        getStatusList({
          type: "vacations",
          id: vacationID,
          listType: "memberList",
          page: 1,
        })
      ),
      dispatch(
        getStatusList({
          type: "vacations",
          id: vacationID,
          listType: "shareList",
          page: 1,
        })
      ),
      dispatch(
        getManyPosts({
          type: "vacation",
          id: vacationID,
          page: 1,
        })
      ),
    ]).then(() => setPreload(false));
    if (timeline) {
      dispatch(setTimeline(timeline[0]));
    }
  }, []);

  useEffect(() => {
    if (timeline) {
      dispatch(setTimeline(timeline[0]));
    }
  }, [timeline]);

  // when new post added, call API again to update new post to list
  useEffect(() => {
    if (isUpdatePost) {
      dispatch(
        getManyPosts({
          type: "vacation",
          id: vacationID,
          page: 1,
        })
      );
      dispatch(isPostListChanged(false));
    }
  }, [isUpdatePost, dispatch, vacationID]);

  // handle Scroll increase currentPage
  const loadMorePosts = () => {
    if (page < pages && page === currentPage.current) {
      dispatch(
        getManyPosts({
          type: "vacation",
          id: vacationID,
          page: page + 1,
        })
      );
      currentPage.current += 1;
    }
  };

  // add event onscroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <>
      {preload ? (
        <Preloader />
      ) : (
        <div className={cx("wrapper")}>
          {!isSmallSize && <Sidebar />}

          <div className={cx("content")}>
            {urlType === null || urlType === "post" ? <Posts /> : <Album />}
          </div>

          {isMediumSize && (
            <>
              <div
                className={cx("timeline-res")}
                onClick={() => setResModal(true)}
              >
                <FontAwesomeIcon icon={faBarsStaggered} />
              </div>
              <DrawerRes setResModal={setResModal} resModal={resModal} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Vacation;
