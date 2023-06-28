import styles from "./Retrieval.module.scss";
import classNames from "classnames/bind";
import InputForm from "../../components/InputForm/InputForm";
import images from "~/images";
// import keyImg from "~/images/key.png";
// import backImg from "~/images/back.png";
import { FORGOT, RESET } from "~/utils/constants";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);
const Retrieval = (props) => {
  const { list, handleRoute, length, handleBack } = props;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Image src={images.key} alt="This is icon" />
        <div className={cx("title")}>Forgot your password?</div>
        <div>Don’t worry we will send you reset code</div>
      </div>

      <InputForm
        list={list}
        type={length === 2 ? FORGOT : RESET}
        handleRoute={handleRoute}
      />

      <div className={cx("footer")}>
        <Image src={images.back} alt="This is icon" />
        Back to <span onClick={handleBack}>login</span>
      </div>
    </div>
  );
};

export default Retrieval;
