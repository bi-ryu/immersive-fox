import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import { VolumeUpRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useScrollPosition } from '../../../hooks';
import { VIDEO_URL } from "../../../config";
import { BlockContent } from "../../../components";
import {FeatureContent} from "../../../components";
import styles from "./styles.module.scss";
import { Benefit1, Benefit2, Benefit3, Benefit4, Benefit5, Benefit6 } from "../../../assets/icons";
import Slider from "react-slick";


const About = () => {
  const history = useHistory();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const scroll = useScrollPosition();
  const playerRef = useRef(null);
  const onRoute = () => {
    history.push({ pathname: "/useCases" });
    window.scrollTo(0, 0);
  };

  const content = {
    label: "About Us",
    title: "Why AI Generated Videos?",
    text: "We allow you to create videos in minutes, not weeks. No need for film crews, studios, actors, or cameras. Auto-translate your videos into 50+ languages within seconds.",
    btnTitle: "Explore Use Cases",
    onClick: onRoute,
  };

  const features = [
    {
      Icon: Benefit1,
      width:86,
      height: 86,
      title: 'Easy to Use',
      description: 'No need for a film \n crew, editors or cameras'
    },
    {
      Icon: Benefit2,
      width:86,
      height: 86,
      title: 'Fatest in the world',
      description: 'Videos \n generated in minutes not weeks'
    },
    {
      Icon: Benefit3,
      width:86,
      height: 87,
      title: 'Save Money',
      description: '0.07% of the \n market price'
    },
    {
      Icon: Benefit4,
      width:90,
      height: 90,
      title: 'Painless translation and \n modification',
      description: 'Text to video \n support for 50+ languages'
    },
    {
      Icon: Benefit5,
      width:86,
      height: 87,
      title: 'API Integration',
      description: 'Use together with \n your favourite CRMs'
    },
    {
      Icon: Benefit6,
      width:88,
      height: 87,
      title: 'High resolution',
      description: 'Studio Recording \n quality in 1 click'
    }

  ]

  useEffect(() => {
    if ((scroll > 325) && (scroll < 1484)) {
      setPlaying(true);
    } else {
      setPlaying(false);
      setMuted(true);
    }
  }, [scroll])

  const playVideo = () => {
    if (playing === false) {
      setPlaying(true)
    } else {
      if (muted ===  true) {
        setMuted(false);
      } else {
        setPlaying(false);
      }
    }
  }

  const onPlay = () => {
    setPlaying(true)
  }

  const onPause = (e) => {
    e.preventDefault();
  }
  const videoPlayerScreenClick = () => {
  }
  const benefits = features.map((item, index) => (
    <FeatureContent {...item} index={index}/>
  ))

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
  
  return (
    <div className={styles.about} id="aboutUs">
      <div className={styles.container}>
        <div className={styles.about__box}>
          <div className={styles.about__left} data-aos="fade-right">
            <BlockContent {...content} />
          </div>
          <div className={styles.about__right} ref={playerRef}>
            <div onClick={videoPlayerScreenClick}>
              <ReactPlayer url={VIDEO_URL} muted={muted} playing={playing} loop volume={0.2} controls={true} onPlay={onPlay} onPause={onPause} playsinline/>
            </div>
            <div style={{ position: "absolute", top: "calc(50% - 32px)", left: "calc(50% - 32px)" }}>
              <IconButton onClick={() => playVideo()}>
                {
                  playing === false ?
                    <VolumeUpRounded style={{ fontSize: 48, color: '#a5a5a5'}} />
                    :
                    muted === true ? 
                    <VolumeUpRounded style={{ fontSize: 48, color : '#a5a5a5'}} /> 
                    : 
                    <></>
                }
              </IconButton>
            </div>
          </div>
        </div>
        <div className={styles.about__feature}>
          {window.innerWidth > 680 ? benefits : <Slider {...settings}> {benefits} </Slider>}
          </div>
      </div>
    </div>
  );
};

export default About;
