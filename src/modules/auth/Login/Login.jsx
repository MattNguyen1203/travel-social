import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";

import InputForm from "../components/InputForm/InputForm";
import images from "~/images";

import Retrieval from "./Retrieval/Retrieval";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "~/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeRenderList } from "~/store/slices/authSlice";
import Notification from "~/components/Notifications/Notification";
import Image from "~/components/Image/Image";

const cx = classNames.bind(styles);
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State save the value of Login/forgot and reset password
  const { renderList, isLogin, status, message } = useSelector(
    (state) => state.auth
  );
  // Get the last item of "renderList"
  const current = renderList[renderList.length - 1].list;

  // Check then RenderList is first item or not
  const [isFirstLevel, setLevel] = useState(true);

  // When component mounts, user logged in before => direct to new feed
  useEffect(() => {
    if (isLogin && !status) {
      navigate("/");
    }
  }, [isLogin]);
  // Go to next page
  const handleRoute = () => {
    dispatch(
      changeRenderList({ type: "ADD", data: { list: current.children } })
    );
    setLevel(false);
  };

  // Back to previous page
  const handleBack = () => {
    dispatch(
      changeRenderList({ type: "BACK", data: { list: current.children } })
    );
    if (renderList.length === 2) setLevel(true);
  };

  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <div className={cx("wrapper")}>
      {isFirstLevel ? (
        <>
          <div className={cx("title")}>Login</div>
          <InputForm list={current} type={LOGIN} url="/" />
          <div className={cx("sub-ft")}>
            <div className={cx("checkbox")}>
              <input type="checkbox" id="squaredcheck" />
              <label htmlFor="squaredcheck">Remember me</label>
            </div>
            <div className={cx("re-pass")} onClick={handleRoute}>
              Forgot password
            </div>
          </div>
          <div className={cx("other-methods")}>
            <div>or sign in with</div>
            <div className={cx("login-icon")}>
              <Image src={images.facebook} alt="This is Facebook icon" />
              <Image src={images.google} alt="This is Google icon" />
              <Image src={images.twitter} alt="This is Twitter icon" />
            </div>
          </div>

          <div className={cx("direct")}>
            If you don't have an account, please change to{" "}
            <span onClick={handleNavigate}>register</span>
          </div>
        </>
      ) : (
        <Retrieval
          list={current}
          handleRoute={handleRoute}
          length={renderList.length}
          handleBack={handleBack}
        />
      )}
    </div>
  );
};

export default Login;
