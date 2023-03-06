import React from "react";
import { IntroTitle } from "../../../components";
//styles
import styles from "./styles.module.scss";

const IntroCase = () => {
  const introObj = {
    title: "Creating Unlimited Possibilities With AI",
    subTitle: "We allow you to create videos in minutes, not weeks. ",
  };
  return (
    <div className={styles.intro}>
      <div className="container">
        <div className={styles.intro__content}>
          <IntroTitle {...introObj} />
        </div>
      </div>
    </div>
  );
};

export default IntroCase;
