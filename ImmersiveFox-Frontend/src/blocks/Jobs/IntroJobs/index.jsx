import React, { useState } from "react";
import Slider from "react-slick";
//components
import { IntroTitle, JobInfo } from "../../../components";
//assets
import { Union, Union1, Union2, Union3, Union4 } from "../../../assets/icons";
//styles
import styles from "./styles.module.scss";

const IntroJobs = () => {
  const [indexSlide, setIndexSlide] = useState(0);
  const settings = {
    dots: true,
    dotsClass: "main__dots",
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    slidesToShow: 1,
    pauseOnHover: true,
    equalizeHeight: true,
    className: "jobs__slaider",
    afterChange: (current) => setIndexSlide(current),
  };

  const introObj = {
    title: "Our Core Values",
  };

  const jobsInfo = [
    {
      Icon: Union1,
      title: "Engaging Work",
      text: "We use state of the art research and bleeding-edge technology, making what seemed impossible a new reality. Our team is enthusiastic, productive and fast-moving.",
    },
    {
      Icon: Union2,
      title: "Flexible working style",
      text: "We believe work is an act, not a place. When we disengage work from a location, we can accommodate a broad range of life choices. You can choose to work from home or while you travel.",
    },
    {
      Icon: Union3,
      title: "Work/life balance",
      text: "The way we balance the fast-paced demands of a high-growth startup and sustainability is making rest a priority. We offer a flexible PTO policy and make sure that rest is also part of the workday, not just during time off.",
    },
    {
      Icon: Union4,
      title: "Diversity and Inclusion",
      text: "We strive for excellence and recognize that our differences make us stronger. We respect and seek out the inclusion of differences, realizing we can learn from each other.",
    },
  ];

  const Fox = jobsInfo[indexSlide].Icon;

  return (
    <div className={styles.intro}>
      <div className="container">
        <IntroTitle {...introObj} />
        <div className={styles.intro__values}>
          <div className={styles.intro__side} data-aos="fade-right">
            {jobsInfo.slice(0, 2).map((item, index) => (
              <JobInfo {...item} key={index} />
            ))}
          </div>
          <div className={styles.intro__union} data-aos="flip-up">
            <Union />
          </div>
          <div className={styles.intro__side} data-aos="fade-left">
            {jobsInfo.slice(2, 4).map((item, index) => (
              <JobInfo {...item} key={index} />
            ))}
          </div>
        </div>

        <div className={styles.intro__slaider}>
          <div className={styles.intro__slaiderUnion} data-aos="flip-up">
            <Fox />
          </div>
          <Slider {...settings}>
            {jobsInfo.map((item, index) => (
              <JobInfo {...item} key={index} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default IntroJobs;
