import React from "react";
import classNames from "classnames/bind";
import styles from "./NewFeed.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "~/components/Image/Image";
// import Preloader from "../Preloader/Preloader";

const NewFeed = () => {
  const [locations, setLocations] = useState([]);
  const [vacations, setVacation] = useState([]);

  console.log(vacations);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchTrendingPlace = await axios.get(
          `https://vacation-backend.onrender.com/location/?type=trending&number=7`
        );
        setLocations(fetchTrendingPlace.data.data);

        const fetchVacation = await axios.get(
          `https://vacation-backend.onrender.com/vacation?page=1&type=newFeed`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRrdWJhc2kiLCJpYXQiOjE2ODcyNDMzMDksImV4cCI6MTY4NzMyOTcwOX0.0kU_9uMmJqeA1d_BWvEnYdAb_WSuWlpeM-gMN_oiBRE",
            },
          }
        );
        console.log(fetchVacation);
        setVacation(fetchVacation.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const cx = classNames.bind(styles);
  return (
    <div className={cx("container")}>
      {/* <Preloader /> */}
      <div className={cx("user-info")}>1</div>
      <div className={cx("feed")}>
        <ul>
          {vacations.map((vacation) => (
            <li key={vacation._id}>
              {/* <div>{vacation.authorInfo._id}</div> */}
              <Image src={vacation.authorInfo.avatar} alt="?" />
              <div>{vacation.authorInfo.username}</div>
              <div>
                {vacation.startingTime} - {vacation.endingTime}
              </div>
              <Image src={vacation.cover} alt="???" />
              <div>{vacation.views}</div>
              <div>{vacation.likes}</div>
              <div>{vacation.comments}</div>
              <div>{vacation.title}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={cx("trending")}>
        <ul>
          {locations.map((location) => (
            <li key={location._id}># {location.title}</li>
          ))}
          <div>...</div>
        </ul>
      </div>
    </div>
  );
};

export default NewFeed;
