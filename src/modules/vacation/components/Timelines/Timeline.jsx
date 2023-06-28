import styles from "./Timeline.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Timeline = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <header># Timeline</header>
        <main>
          <div className={cx("timeline-item", "item-active")}>
            <span className={cx("index")}>1.</span>
            <span className={cx("value")}>21 - 06 - 2023</span>
          </div>
          <div className={cx("timeline-item")}>
            <span className={cx("index")}>2.</span>
            <span className={cx("value")}>21 - 06 - 2023</span>
          </div>
          <div className={cx("timeline-item")}>
            <span className={cx("index")}>3.</span>
            <span className={cx("value")}>21 - 06 - 2023</span>
          </div>
        </main>
      </div>

      <div className={cx("active")}>
        <span>Date</span>
        <span className={cx("date")}>21 - 06 - 2023</span>
      </div>
    </div>
  );
};

export default Timeline;
