import React from "react";
//components
import { BlockContent, Step } from "../../../components";
//helpers
import { scrollTarget } from "../../../helpers";
//assets
import { Step1, Step2, Step3 } from "../../../assets/icons";
//styles
import styles from "./styles.module.scss";

const Works = () => {
  const worksData = [
    {
      title: "Step 1",
      text: "Create a short video of your face or select one of our presenters.",
      Icon: Step1,
    },
    {
      title: "Step 2",
      text: "Provide a text of your script. We generate audio from it with your voice or with an AI-generated voice.",
      Icon: Step3,
    },
    {
      title: "Step 3",
      text: "We generate video within minutes.",
      Icon: Step2,
    },
  ];

  const onScrollBlock = () => {
    scrollTarget("connectWithUs");
  };

  const content = {
    label: "How it works",
    title: "Generate Your Video Content in Just a Few Easy Steps",
    btnTitle: "Let’s Get in Touch",
    onClick: onScrollBlock,
  };

  return (
    <div className={styles.works} id="howItWorks">
      <div className="container">
        <div className={styles.works__box}>
          <div className={styles.works__left}>
            {worksData.map((item, index) => (
              <Step {...item} key={index} index={index} />
            ))}
          </div>
          <div className={styles.works__right} data-aos="fade-left">
            <BlockContent {...content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
