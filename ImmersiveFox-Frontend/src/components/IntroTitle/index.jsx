import React from "react";
//styles
import styles from "./styles.module.scss";

const IntroTitle = ({ title, subTitle }) => {
  return (
    <div className={styles.intro__title}>
      <h2>​{title}</h2>
      <h5>{subTitle}</h5>
    </div>
  );
};

export default IntroTitle;
