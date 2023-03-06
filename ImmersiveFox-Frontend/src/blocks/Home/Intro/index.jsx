import React from "react";
import Slider from "react-slick";
//components
import { Benefit, Button, IntroTitle } from "../../../components";
//helpers
import { scrollTarget } from "../../../helpers";
//assets
import { Intro1, Intro2, Intro3, Intro4 } from "../../../assets/icons";
import { introBg } from "../../../assets/images";
//styles
import styles from "./styles.module.scss";

const Intro = () => {
  const introObj = {
    title: "Generate Your Video Content in Hours. Not Weeks.",
    subTitle:
      "We build your digital AI twin. Generate video content with your face from any text in minutes.",
  };
  const benefits = [
    {
      title: "Painless translation and modification",
      text: "Text to video support for 25+ languages",
      Icon: Intro1,
      side: "left",
    },
    {
      title: "Save Money",
      text: "7% of the market price",
      Icon: Intro2,
      side: "left",
    },
    {
      title: "Get Results Quickly",
      text: "Videos generated in hours not weeks",
      Icon: Intro4,
      side: "right",
    },
    {
      title: "Easy to Use",
      text: "No need for film crew, editors or cameras.",
      Icon: Intro3,
      side: "right",
    },
  ];

  const settings = {
    dots: true,
    dotsClass: "main__dots",
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "linear",
    slidesToScroll: 1,
    slidesToShow: 1,
    pauseOnHover: true,
  };

  const onScrollBlock = () => {
    scrollTarget("aboutUs");
  };

  return (
    <div className={styles.intro}>
      <div className="container__big">
        <div
          className={styles.intro__content}
          data-aos="fade-right"
          data-aos-duration="600"
        >
          <IntroTitle {...introObj} />
          <div className={styles.intro__contentBtn}>
            <Button title="Learn More" onClick={onScrollBlock} fullOrange />
          </div>
        </div>

        <div
          className={styles.intro__benefits}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <img src={introBg} alt="intro" />
          <div className={styles.intro__benefitItems}>
            {benefits.map((item, index) => (
              <Benefit {...item} index={index} key={index} absolute />
            ))}
          </div>
        </div>

        <div className={styles.intro__slaider}>
          <Slider {...settings}>
            {benefits.map((item, index) => (
              <Benefit {...item} key={index} index={index} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Intro;
