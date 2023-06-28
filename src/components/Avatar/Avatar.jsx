import { useEffect, useState } from "react";
import { Upload, message } from "antd";
import Loading from "../Loading/Loading";
import authAPI from "~/api/authAPI";
import styles from "./Avatar.module.scss";
import classNames from "classnames/bind";
import Image from "../Image/Image";

const cx = classNames.bind(styles);
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Avatar = ({ avatar }) => {
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState();

  const uploadButton = <div>{loading && <Loading />}</div>;

  console.log(imageUrl);
  const handleAPI = (info) => {
    setLoading(true);
    const fetchAPI = async () => {
      getBase64(info.file, async (url) => {
        const res = await authAPI.updateUser({ avatar: url });
        if (res.status === 200) {
          setLoading(false);
        }
        setImageUrl(url);
      });
    };
    fetchAPI();
  };
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={cx("avatar-uploader")}
      showUploadList={false}
      customRequest={handleAPI}
      beforeUpload={beforeUpload}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt="avatar" className={cx("avatar")} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default Avatar;
