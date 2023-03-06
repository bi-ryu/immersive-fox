import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
//components
import { IconButton } from "@mui/material";
import { VolumeUpRounded } from "@mui/icons-material";
import { Button, Case } from "../../../components";
//config
import { SCHEDULE_URL } from "../../../config";
//hooks
import { useCurrentLocation, useScrollPosition } from "../../../hooks";
//assets
import {
  Calendar,
  Use1,
  Use2,
  Use3,
  Use4,
  Use21,
  Use22,
  Use23,
  Use24,
  Use31,
  Use32,
  Use33,
  Use34,
  Use41,
  Use42,
  Use43,
  Use44,
} from "../../../assets/icons";
//styles
import styles from "./styles.module.scss";

const cases = {
  salesEnablement: {
    icons: [Use21, Use22, Use23, Use24],
    text: "Accelerate your sales cycles with engaging video presentations in every language.",
    left: [
      {
        title: "Make it personal",
        text: "Saying customer’s names and mentioning their work in a video improves conversion by 76%. \n Instead of recording a new video for each customer, simply record one clip and use Immersive Fox AI to generate unlimited personalized copies in seconds.",
      },
      {
        title: "As easy as clicking a button",
        text: "No camera or video editing skills are required. Fully automated and integrated with your CRM.",
      }
    ],
    right: [
      {
        title: "Communicate with your customers in their mother tong",
        text: "Amplify your sales with engaging video presentations in 25+ languages.",
      },
      {
        title: "Streamline onboarding",
        text: "Add a personal touch by recording your screen to guide your customer through a website or product. \n Share an instantly generated link, or embed those videos easily on the web.",
      },
    ],
    video: "https://storage.googleapis.com/immersive-fox-backend-bucket/landing_page/if-v3.mp4",
    volume: 0.2
  },
  customerCommunications: {
    icons: [Use1, Use2, Use3, Use4],
    text: "Discover a whole new way to delight customers and reach resolutions faster.",
    left: [
      {
        title: "Customer onboarding",
        text: "Make it easy for customers to understand a product or concept using generated videos. Simply record your product or a website, type in the text and we generate your video in minutes.",
      },
      {
        title: "Easy to integrate",
        text: "Share or embed through API your videos in email, video chatbots, on your website or anywhere else you support your customers.",
      },
    ],
    right: [
      {
        title: "Communicate with your customers in their mother tongue",
        text: "Reach out to your customers in 25+ languages.",
      },
      {
        title: "Save on production cost and complexity",
        text: "0.07% of the market price. No studios, cameras and video editing skills are required.",
      },
    ],
    video: "https://storage.googleapis.com/shareable-video/6aba53ea-5f26-5f22-b6c1-9af4c71a222c-3c391a2d-40ad-5da0-9b60-1ce41c51a521.mp4",
    volume: 1
  },
  learningDevelopment: {
    icons: [Use31, Use32, Use33, Use34],
    text: "Create your video content in minutes instead of weeks. Quickly make quality educational content. Translate them into 25+ languages.",
    left: [
      {
        title: "Turn slides into videos",
        text: "Convert your slide deck to a video presentation in minutes. No video editing skills are required. Simply upload your slides, type out your script or upload audio, and create engaging video material at the click of a button.",
      },
      {
        title: "Easily create and update content",
      },
    ],
    right: [
      {
        title: "Save on production cost and complexity.",
        text: "Creating or updating videos is as simple as clicking a button. New educational content? No problem – simply edit the script and update your video.",
      },
      {
        title: "Communicate in 25+ languages ",
        text: "Amplify your communications with engaging video presentations in every language.",
      },
    ],
    video: "https://storage.googleapis.com/shareable-video/6aba53ea-5f26-5f22-b6c1-9af4c71a222c-3c391a2d-40ad-5da0-9b60-1ce41c51a521.mp4",
    volume: 1
  },
  corporateCommunications: {
    icons: [Use41, Use42, Use43, Use44],
    text: "It’s never been easier to engage your global employees or partners. Create convincing video presentations for internal and external stakeholders.",
    left: [
      {
        title: "Turn slides into videos",
        text: "Convert your slide deck to a video presentation in minutes. Simply upload your slides, type out your script or upload audio, and create engaging videos at the click of a button. \n No video editing skills are required.",
      },
    ],
    right: [
      {
        title: "Communicate in 25+ languages",
        text: "Amplify your communications with engaging video presentations in every language.",
      },
      {
        title: "Easily create and update content",
        text: "Creating or updating videos is as simple as clicking a button. \n New policy or regulation? No problem – simply edit the script and update your video.",
      },
    ],
    video: "https://storage.googleapis.com/shareable-video/6aba53ea-5f26-5f22-b6c1-9af4c71a222c-3c391a2d-40ad-5da0-9b60-1ce41c51a521.mp4",
    volume: 1
  },
};

const DefaultCase = () => {
  const location = useCurrentLocation().split("/").pop();
  const current = cases[location];

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const scroll = useScrollPosition();

  useEffect(() => {
    if (scroll < 836) {
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
      if (muted === true) {
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

  const openSchedule = () => {
    window.open(SCHEDULE_URL, "_blank");
  };

  return (
    <div className={styles.commun} data-aos="fade-up">
      <div className={styles.commun__header}>
        <div className={styles.commun__icons}>
          {current.icons.map((Icon, index) => (
            <Icon key={index} />
          ))}
        </div>
        <Case text={current.text} />
      </div>
      <div className={styles.commun__box}>
        <div className={styles.commun__side}>
          {current.left.map((item, index) => (
            <Case {...item} key={index} />
          ))}
        </div>
        <div className={styles.commun__video}>
          <div onClick={videoPlayerScreenClick}>
            <ReactPlayer url={current.video} muted={muted} playing={playing} loop volume={current.volume} controls onPlay={onPlay} onPause={onPause} playsinline/>
          </div>
          <div style={{ position: "absolute", top: "calc(50% - 32px)", left: "calc(50% - 32px)" }}>
            <IconButton onClick={() => playVideo()}>
              {
                playing === false ?
                <VolumeUpRounded style={{ fontSize: 48, color: '#a5a5a5'}} />
                  :
                  muted === true ?
                  <VolumeUpRounded style={{ fontSize: 48, color: '#a5a5a5'}} />
                    :
                    <></>
              }
            </IconButton>
          </div>
        </div>
        <div className={styles.commun__side}>
          {current.right.map((item, index) => (
            <Case {...item} key={index} />
          ))}
        </div>
      </div>
      <div className={styles.commun__btn}>
        <Button
          title="Schedule a Meeting"
          Icon={Calendar}
          onClick={openSchedule}
        />
      </div>
    </div>
  );
};

export default DefaultCase;
