import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NewAlbum.module.scss";
import classNames from "classnames/bind";
import Slider from "./Slider/Slider";
import "./Preloader.scss";
import Image from "./Image/Image";
import {
	createAlbumPage,
	getAlbumPage,
	updateAlbumPage,
	resetSelectedImages,
	getDetail,
	deleteAlbum,
} from "~/store/slices/albumSlice";
import { Button } from "antd";
const cx = classNames.bind(styles);

const NewAlbum = () => {
	const albumId = useParams().id;
	const dispatch = useDispatch();
	const ref = useRef(null);
	const navigate = useNavigate();
	const {
		selectedImages,
		selectedPageId,
		selectedAlbum: { _id, title, vacationId, authorInfo },
	} = useSelector((state) => state.album);
	const { info } = useSelector((state) => state.auth);
	const [containerSize, setContainerSize] = useState({
		outerWidth: 0,
		outerHeight: 0,
	});
	const [isOpen, setIsOpen] = useState(false);
	const isAuthor = authorInfo?._id === info?._id;

	useEffect(() => {
		setContainerSize({
			outerWidth: ref.current.offsetWidth,
			outerHeight: ref.current.offsetHeight,
		});
	}, [ref]);

	useEffect(() => {
		dispatch(resetSelectedImages());
		if (albumId) {
			dispatch(getDetail({ id: albumId }));
			dispatch(getAlbumPage({ page: 1, albumId: albumId }));
		}
	}, [dispatch, albumId]);

	const saveAlbum = () => {
		(albumId && selectedPageId
			? dispatch(
					updateAlbumPage({
						albumpageId: selectedPageId,
						albumId: _id,
						vacationId: vacationId,
						page: 1,
						resource: selectedImages.map((item) => ({
							style: item.style,
							resourceId: item._id,
						})),
					})
			  )
			: dispatch(
					createAlbumPage({
						albumId: _id,
						vacationId: vacationId,
						page: 1,
						resource: selectedImages.map((item) => {
							return {
								style: item.style,
								resourceId: item._id,
							};
						}),
					})
			  )
		).then(() => navigate("/profile/album"));
	};

	const handleDelete = (id) => {
		dispatch(deleteAlbum({ id })).then(() => {
			navigate("/profile/album");
		});
	};

	const handleWrapClick = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<>
			<div className={`wrap ${isOpen ? "open" : ""} ${isAuthor ? "" : "not-author"}`}>
				<div className="overlay" onClick={handleWrapClick}>
					<div className="overlay-content animate slide-left delay-2">
						<h1 className="animate slide-left pop delay-4 line">{title}</h1>
						<p
							className="animate slide-left pop delay-5"
							style={{ color: "white", marginBottom: "2.5rem" }}
						>
							Sign: <em>{authorInfo?.username}</em>
						</p>
					</div>
					<div className="image-content animate slide delay-5"></div>
					<div className="dots animate">
						<div className="dot animate slide-up delay-6"></div>
						<div className="dot animate slide-up delay-7"></div>
						<div className="dot animate slide-up delay-8"></div>
					</div>
				</div>
				<div className="text">
					<div className={cx(isAuthor ? "mother" : "mother-banned-you")} ref={ref}>
						{selectedImages.map((item) => (
							<Image key={item._id} imgData={item} containerSize={containerSize} />
						))}
					</div>
				</div>
			</div>
			{isAuthor && (
				<>
					<Slider />
					<div className={cx("btn-group")}>
						<Button type="primary" disabled={selectedImages.length === 0} onClick={saveAlbum}>
							Save
						</Button>
						{albumId && (
							<Button
								danger
								type="primary"
								onClick={() => {
									handleDelete(albumId);
								}}
							>
								Delete
							</Button>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default NewAlbum;
