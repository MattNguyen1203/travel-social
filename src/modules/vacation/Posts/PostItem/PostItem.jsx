import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "./PostItem.module.scss";
import classNames from "classnames/bind";
import moment from "moment/moment";

import Interaction from "../../components/Interact/Interaction";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);

const PostItem = (props) => {
  const { postDetail } = props;
  // console.log("postDetail", postDetail);

  const { authorInfo, content, resource, comments, likes, lastUpdateAt, _id } =
    postDetail;

  return (
    <div className={cx("wrapper")}>
      <header>
        <div className={cx("user-info")}>
          <Image path={authorInfo.avatar} alt="" className={cx("avatar")} />

          <div className={cx("username-container")}>
            {/* <div className={cx("fullname")}>Trung Hiếu</div> */}
            <div className={cx("username")}>{authorInfo.username}</div>

            <div className={cx("moment")}>{moment(lastUpdateAt).fromNow()}</div>
          </div>
        </div>
        <FontAwesomeIcon icon={faEllipsisVertical} className={cx("options")} />
      </header>

      <main>
        <div className={cx("description")}>{content}</div>
        <div className={cx("img-container")}>
          {resource.map((item, index) => (
            <Image src={item} alt="" key={index} />
          ))}
          {resource.map((item, index) => (
            <Image src={item} alt="" key={index} />
          ))}
        </div>
      </main>
      <Interaction likes={likes} comments={comments} postID={_id} />
    </div>
  );
};

export default PostItem;
