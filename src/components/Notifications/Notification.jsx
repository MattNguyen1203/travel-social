import { Modal } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FORGOT, RESET } from "~/utils/constants";

const success = (title, message, handleSucces) => {
  Modal.success({
    title: title,
    content: message,
    afterClose: () => handleSucces(),
  });
};

const error = (title, message) => {
  Modal.error({
    title: title,
    content: message,
  });
};
const Notification = (props) => {
  const { status, messageResult, isLoading } = useSelector(
    (state) => state.auth
  );
  const { url, type, handleRoute } = props;
  // console.log(messageResult);

  const navigate = useNavigate();

  useEffect(() => {
    function handleSucces() {
      if (type === FORGOT) {
        handleRoute();
      } else if (type !== FORGOT && type !== RESET) {
        navigate(url);
        window.location.reload();
      }
    }

    if (status && messageResult) {
      if (status.toString().startsWith("2")) {
        success("success", messageResult, handleSucces);
      } else {
        error("error", messageResult);
      }
    }
  }, [isLoading]);

  return <></>;
};

export default Notification;
