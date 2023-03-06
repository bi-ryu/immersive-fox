import React from "react";
import Slider from "react-slick";
//assets
import {
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7,
  client8,
  client9,
  client10
} from "../../../assets/images";
//styles
import styles from "./styles.module.scss";

const images = [
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7,
  client8,
  client9,
  client10
];

const Clients = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    slidesToScroll: 1,
    slidesToShow: 4,
    pauseOnHover: false,
    pauseOnFocus: false,
    touchMove: false,
    className: "client",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className={styles.clients} id="ourClients">
      <h5 data-aos="flip-up" data-aos-duration="800">
        They trust us
      </h5>
      <div className={styles.client__box}>
        <Slider {...settings}>
          {images.map((item, index) => (
            <div className={styles.client} key={index}>
              <img src={item} alt="logo" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Clients;
