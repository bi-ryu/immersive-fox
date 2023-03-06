import React from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
//components
import {BlockContent, Dev} from "../../../components";
//assets
import { team0, team1, team2, team3, team4, team5, team6, team7, team8, team9, team10 } from "../../../assets/images";
//styles
import styles from "./styles.module.scss";

const Team = () => {
  const history = useHistory();
  const onRoute = () => {
    history.push({ pathname: "/jobs" });
  };

  const devData = [
    {
      avatar: team1,
      name: "Alisa Patotskaya",
      position: "CEO, Founder",
      text: "10+years engineering in Facebook, Wargaming.\nMSc Computer Science.",
    },
    {
      avatar: team8,
      name: "Evgeniy Polyakov",
      position: "Head of R&D",
      text: "Ex founder of Reverbrain, 20+ years in engineering & AI (Bumble)",
    },
    {
      avatar: team2,
      name: "Yury Pisarchik",
      position: "Tech Lead",
      text: `10+ years in AI in\n Google, Yandex.`,
    },
    {
      avatar: team10,
      name: "Hanna Paulava",
      position: "R&D",
      text: `10+ years in AI and ML \nMSc, Applied Data Analysis`,
    },
    {
      avatar: team5,
      name: "Sohaib Aslam",
      position: "Software Engineer",
      text: "5+ years in infrastucture\n & web development",
    },
    {
      avatar: team7,
      name: "JinHe Liu",
      position: "Infrastructure Developer",
      text: "5+ years in web\n development",
    },
    {
      avatar: team6,
      name: "Pavel Khenkin",
      position: "Web designer",
      text: "5+ years in web design",
    },
    {
      avatar: team3,
      name: "Yuliya Le Merrer",
      position: "R&D",
      text: "13+ years in AI, \n Computer Science MSc.",
    },
    {
      avatar: team9,
      name: "Anna Andersson",
      position: "Business Development Advisor",
      text: "Platfrom at Pretiosum Ventures",
    },
    {
      avatar: team4,
      name: "Guillaume Bouchard",
      position: "Industry Adviser",
      text: "Bloomsbury AI \n Founder. PhD Applied Mathematics.",
    },
    {
      avatar: team0,
      name: "Maybe it's you",
      position: "",
      text: "Software Engineer; Designer",
      button: 'Join Our Team'
    }
  ];

  const content = {
    label: "Our Team",
    title: "The Minds Behind Immersive Fox",
    text: "We are a team of highly skilled professionals with deep AI domain expertise.",
    btnTitle: "Join Our Team",
    onClick: onRoute,
  };

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
  };

  const cards = devData.map(
    (item, index) => (
      <Dev {...item} key={index} index={index} >
        {item.button ? <h3 className={styles.team__text_button} onClick={onRoute}>{item.button}</h3> : null}
      </Dev>
    ))

  return (
    <div className={styles.team} id="team">
      <div className="container">
        <div className={styles.team__box}>
          <div className={styles.team__header}>
            <BlockContent {...content} showBtn={false} />
          </div>
        </div>
        <div className={styles.team__box}>
          <div className={styles.team__blocks}>
          {
            window.innerWidth > 680 ? cards : <Slider {...settings}> {cards} </Slider>
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
