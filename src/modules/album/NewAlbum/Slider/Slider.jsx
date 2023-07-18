import React, { useState, useEffect } from "react";
import axiosClient from "~/api/axiosClient";
import "./Slider.css";
import { useSearchParams } from "react-router-dom";
import styles from "./Slider.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Slider = () => {
  const [active, setActive] = useState(0);
  const [img, setImg] = useState([]);
  const cardCount = img.length;
  const [searchParams] = useSearchParams();
  const dataId = Object.fromEntries([...searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchImg = await axiosClient.get(`vacation/${dataId.id}/images`);
        setImg(fetchImg.data.data);
        console.log(fetchImg);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dataId.id]);

  // console.log(fetchImg, img);
  //   const [searchParam] = useSearchParams();

  //   const title = searchParam.get("title");
  //   const vacationId = searchParam.get("id");

  const prevSlide = () => {
    setActive((active - 1 + cardCount) % cardCount);
  };

  const nextSlide = () => {
    setActive((active + 1) % cardCount);
  };

  useEffect(() => {
    const cardContainers = document.querySelectorAll(
      `.${cx("card-container")}`
    );

    cardContainers.forEach((container, i) => {
      const offset = ((active - i) % cardCount) / 3;
      const direction = Math.sign(active - i);
      const absOffset = Math.abs(active - i) / 3;
      const isActive = i === active ? 1 : 0;
      const opacity = Math.abs(active - i) <= 1 ? 1 : 0;

      container.style.setProperty("--offset", offset);
      container.style.setProperty("--direction", direction);
      container.style.setProperty("--abs-offset", absOffset);
      container.style.setProperty("--active", isActive);
      container.style.setProperty("--opacity", opacity);
    });
  }, [active, cardCount]);

  // const updateCarousel = () => {
  //   const cardContainers = document.querySelectorAll(
  //     `.${cx("card-container")}`
  //   );

  //   cardContainers.forEach((container, i) => {
  //     const offset = ((active - i) % cardCount) / 3;
  //     const direction = Math.sign(active - i);
  //     const absOffset = Math.abs(active - i) / 3;
  //     const isActive = i === active ? 1 : 0;
  //     const opacity = Math.abs(active - i) <= 1 ? 1 : 0;

  //     container.style.setProperty("--offset", offset);
  //     container.style.setProperty("--direction", direction);
  //     container.style.setProperty("--abs-offset", absOffset);
  //     container.style.setProperty("--active", isActive);
  //     container.style.setProperty("--opacity", opacity);
  //   });
  // };
  console.log(active, img);

  return (
    <div className={cx("carousel-container")}>
      <div className={cx("carousel")}>
        {img.map((item, index) => (
          <div className={cx("card-container")}>
            <div className={cx("card")}>
              <img key={item._id} src={item?.path} alt="?" />
            </div>
            <button>chọn cái này nhé bạn ơi</button>
          </div>
        ))}

        <button className={cx("nav-left")} onClick={prevSlide}>
          <div className={cx("bi bi-chevron-left")}>trai</div>
        </button>
        <button className={cx("nav-right")} onClick={nextSlide}>
          <div className={cx("bi bi-chevron-right")}>phai</div>
        </button>
      </div>
    </div>
  );
};

export default Slider;