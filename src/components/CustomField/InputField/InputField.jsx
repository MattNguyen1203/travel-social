import { ErrorMessage } from "formik";
import styles from "./InputField.module.scss";
import classNames from "classnames/bind";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const InputField = (props) => {
  const { field, form, type, label, className, onFocus, required } = props;
  const inputRef = useRef();
  const [passType, setPassType] = useState("");
  useEffect(() => {
    setPassType(type);
  }, [type]);
  // Get name & value of Input
  const { name, value } = field;
  const { errors, touched } = form;
  // Check error
  const showError = errors[name] && touched[name];
  // Check name field when register
  const isName = name === "firstname" || name === "lastname";

  // wrapper's classes
  const classes = cx("wrapper", {
    [className]: className,
    ["userName"]: isName && "userName",
  });

  // input's classes
  const inputClasses = cx("input", {
    ["userName-input"]: isName && "userName-input",
    ["empty"]: value === "" && "empty",
  });

  const labelClasses = cx("label", {
    ["active"]: value !== "" && "active",
    ["required"]: required && "required",
  });

  return (
    <div className={classes}>
      <input
        {...field}
        type={passType}
        style={showError && { border: "1px solid blue" }}
        autoComplete="off"
        className={inputClasses}
        value={value ? (isName ? value : value.trim()) : ""}
        spellCheck={false}
        onFocus={onFocus}
        // ref={inputRef}
      />
      {passType === "password" ? (
        <FontAwesomeIcon
          icon={faEye}
          className={cx("icon")}
          onClick={() => setPassType("text")}
        />
      ) : (
        <FontAwesomeIcon
          icon={faEyeSlash}
          className={cx("icon")}
          onClick={() => setPassType("password")}
        />
      )}
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <ErrorMessage
        name={name}
        render={(msg) => <p className={cx("error")}>{msg}</p>}
      />
    </div>
  );
};

export default InputField;
