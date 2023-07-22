import Modal from "react-modal";
import styles from "./HandlePost.module.scss";
import classNames from "classnames/bind";
import Image from "~/components/Image/Image";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import vacationAPI from "~/api/vacationAPI";
import SelectLocation from "~/modules/components/SelectLocation/SelectLocation";
import Notification from "~/components/Notification/Notification";
import Dropdown from "../../album/CreateAlbum/Dropdown/Dropdown";

const cx = classNames.bind(styles);
Modal.setAppElement("#root");
const HandlePost = ({ showModal, handleCloseModal, newfeed }) => {
	const { info } = useSelector((state) => state.auth);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [vacationId, setVacationId] = useState(null);
	const [openNoti, setOpenNoti] = useState(false);
	const [msg, setMsg] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const [selected, setSelected] = useState("Choose Your Vacation");
	const [isError, setIsError] = useState(false);
	const [searchParams] = useSearchParams();
	const [content, setContent] = useState("");
	const [files, setFiles] = useState([]);
	const [listFileId, setListFileId] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [location, setLocation] = useState({});
	const uploadResourcesRef = useRef();

	function openModal() {
		setIsOpen(true);
	}

	const handleClick = async (e) => {
		let fileList = [];
		e.preventDefault();

		try {
			setIsLoading(true);
			await vacationAPI.createPost({
				vacationId: vacationId,
				locationId: location.detail.id,
				content: content,
				resources: listFileId,
			});
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
		handleCloseModal();
		fileList.splice(0, fileList.length);
	};

	const handleUpload = async (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setFiles([e.target.files[0]]);
		}
	};

	useEffect(() => {
		const formData = new FormData();
		formData.append("files", files[0]);
		formData.append("field", "post");
		formData.append("vacationId", vacationId);
		const token = localStorage.getItem("token");
		axios
			.post(
				"http://localhost:3100/resource/",
				{
					files: formData.get("files"),
					field: "post",
					vacationId,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: token,
					},
				}
			)
			.then((res) => {
				const data = res.data.data;
				const ids = data.map((item) => item._id);
				setListFileId(listFileId.concat(ids));
			})
			.catch((err) => console.log(err));
	}, [files]);

	const handleDelete = (deletedFile, index) => {
		setFiles(files.filter((file, i) => i !== index));
	};

	return (
		<>
			<Modal
				isOpen={showModal}
				onRequestClose={handleCloseModal}
				className={cx("modal")}
				overlayClassName={cx("overlay")}
			>
				<div className={cx("wrapper")}>
					<h2 className={cx("title")}>New Post</h2>

					<FontAwesomeIcon
						icon={faCircleXmark}
						className={cx("close-icon")}
						onClick={handleCloseModal}
					/>
					<div className={cx("modal-container")}>
						<div className={cx("user-info")}>
							<div className={cx("info-name")}>
								<Image path={info?.avatar?.path} />
								<div className={cx("username")}>{info?.username}</div>
							</div>
                            <div className={cx("dropdown")}>
                                <Dropdown
                                    selected={selected}
                                    setSelected={setSelected}
                                    setVacationId={setVacationId}
                                />
                            </div>
							
						</div>
						<TextArea
							placeholder="What is on your mind..."
							autoSize={{
								minRows: 6,
								maxRows: 12,
							}}
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<div className={cx("img-uploader")}>
							{files.map((file, index) => (
								<div className={cx("img-container")}>
									<img alt="" src={URL.createObjectURL(file)} />
									<CloseCircleOutlined
										onClick={() => handleDelete(file, index)}
										className={cx("img-btn")}
									/>
								</div>
							))}
						</div>
						<div className={cx("post-extension")}>
							<div> Add on: {location?.detail?.title} </div>
							<div className={cx("extensions")}>
								<div>
									<FontAwesomeIcon
										onClick={openModal}
										icon={faLocationDot}
										className={cx("icon")}
									/>
									<SelectLocation
										openLocation={modalIsOpen}
										setOpenLocation={setIsOpen}
										setLocation={setLocation}
									/>
								</div>
								<div>
									<input
										type="file"
										ref={uploadResourcesRef}
										onChange={handleUpload}
										name="files"
										hidden
									/>
									<FontAwesomeIcon
										icon={faImage}
										className={cx("icon")}
										onClick={() => {
											uploadResourcesRef.current.click();
										}}
									/>
								</div>
							</div>
						</div>
						<button onClick={handleClick} disabled={isLoading} className={cx("btn-submit")}>
							Sending Post
						</button>
					</div>
				</div>
			</Modal>
			<Notification
				openNoti={openNoti}
				setOpenNoti={setOpenNoti}
				msg={msg}
				type="handleVacation"
				isError={isError}
				isSuccess={isSuccess}
			/>
		</>
	);
};

export default HandlePost;
