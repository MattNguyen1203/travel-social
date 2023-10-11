import { useEffect, useRef, useState } from "react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import styles from "./InputForm.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { handleAuth, resetNoti } from "~/store/slices/authSlice";
import { Validate, initValues } from "../config/validateConfig";
import {
  FORGOT,
  LOGIN,
  REGISTER,
  RESET,
  UPDATE_PERSONAL,
  UPDATE_SECURITY,
} from "~/utils/constants";
import Loading from "~/components/Loading/Loading";
import Notification from "~/components/Notification/Notification";
import InputField from "~/components/CustomField/InputField/InputField";
import SelectField from "~/components/CustomField/SelectField/SelectField";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const InputForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openNoti, setOpenNoti] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const { list, type, className, url, handleRoute } = props;
  // Get state
  const { isLoading, info, isSuccess, isError, msg } = useSelector(
    (state) => state.auth
  );
  const { firstname, lastname, dateOfBirth, phoneNumber, gender, nationality } =
    info;
  // Check index of time
  const timeIndex = dateOfBirth && dateOfBirth.indexOf("T");
  // InitialValues variable
  let initialValues = initValues[type];

  // initialValues of Personal
  let initialValuesPersonal = {
    firstname,
    lastname,
    dateOfBirth: dateOfBirth && dateOfBirth.slice(0, timeIndex),
    phoneNumber,
    gender,
    nationality,
  };

  // validate variable
  let validationSchema = Yup.object().shape(Validate[type]);

  // Handle Submit form
  const handleSubmit = (values) => {
    let data;
    switch (type) {
      case LOGIN:
        if (values.username.includes("@")) {
          data = { email: values.username, password: values.password };
          dispatch(handleAuth({ type, data: data }));
        } else {
          dispatch(handleAuth({ type, data: values }));
        }
        break;

      case UPDATE_PERSONAL:
        dispatch(handleAuth({ type: "updateUser", data: values }));
        break;

      case UPDATE_SECURITY:
        data = {
          password: values.newPassword,
        };
        dispatch(handleAuth({ type: "updateUser", data: data }));
        break;
      default:
        dispatch(handleAuth({ type, data: values }));
        break;
    }
  };

  // when API called and done, change noti status to render message
  useEffect(() => {
    if (isSuccess || isError) {
      setOpenNoti(true);
    }
  }, [isSuccess, isError]);

  const handleClear = () => {
    window.location.reload();
  };

  const handleFocus = () => {
    setIsChanged(true);
  };

  const handleSuccessNoti = () => {
    switch (type) {
      case FORGOT:
        handleRoute();
        break;
      case REGISTER:
        navigate(url);
        break;
      case RESET:
      case UPDATE_PERSONAL:
      case UPDATE_SECURITY:
        window.location.reload();
        break;
      default:
        break;
    }
    dispatch(resetNoti());
  };
  const handleErrorNoti = () => {
    dispatch(resetNoti());
  };

  return (
    <>
      <Formik
        initialValues={
          type === UPDATE_PERSONAL ? initialValuesPersonal : initialValues
        }
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => handleSubmit(values)}
      >
        {(formikProps) => {
          const { values, errors, touched } = formikProps;

          return (
            <Form className={cx("form")}>
              <div
                className={cx(
                  "form-container",
                  (type === UPDATE_PERSONAL || type === UPDATE_SECURITY) &&
                    "form-update"
                )}
              >
                {list.data.map((item) => (
                  <FastField
                    key={item.id}
                    name={item.id}
                    type={item.type}
                    component={
                      item.type === "select" ? SelectField : InputField
                    }
                    label={item.label}
                    className={className}
                    options={item.data}
                    onFocus={handleFocus}
                    required={item.required}
                  />
                ))}
              </div>
              {isChanged && (
                <div className={cx("btn-container")}>
                  {type === UPDATE_PERSONAL || type === UPDATE_SECURITY ? (
                    <>
                      <button className={cx("btn-save")} type="submit">
                        <span>Save change</span>
                        {isLoading && <Loading />}
                      </button>
                      <button
                        className={cx("btn-cancel")}
                        onClick={handleClear}
                        type="button"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="submit"
                      className={cx("btn-submit")}
                      disabled={isLoading}
                    >
                      <span>Submit</span>
                      {isLoading && <Loading />}
                    </button>
                  )}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
      {(isError || isSuccess) && (
        <Notification
          msg={msg}
          isError={isError}
          isSuccess={isSuccess}
          openNoti={openNoti}
          setOpenNoti={setOpenNoti}
          handleSuccess={handleSuccessNoti}
          handleError={handleErrorNoti}
        />
      )}
    </>
  );
};

export default InputForm;
